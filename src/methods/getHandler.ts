import read from '../utils/kv';
import { ResponseJson } from '../utils/networks';

interface Params {
	slug: string;
}

interface Context extends ExecutionContext {
	props: {
		params: Params;
	};
}

export default async function getHandler(req: Request, env: Env, ctx: Context): Promise<Response | undefined | void> {
	const slug = ctx.props?.params?.slug;

	if (!slug) {
		return new Response(null, {
			status: 404,
			statusText: 'Not Found',
		});
	}

	const data = await read(env, slug);

	if (data) {
		return ResponseJson(
			req,
			env,
			{ data },
			{
				headers: {
					'Cache-Control': 'public, max-age=86400',
				},
			}
		);
	}
}
