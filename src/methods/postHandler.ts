import { add } from '../utils/kv';
import { ResponseJson, ResponseText } from '../utils/networks';

interface Body {
	data: string;
}

interface Context extends ExecutionContext {
	props: {
		body: Body;
	};
}

export default async function postHandler(req: Request, env: Env, ctx: Context): Promise<Response | undefined | void> {
	if (typeof ctx.props?.body?.data !== 'string') {
		return ResponseText(req, env, null, {
			status: 400,
			statusText: 'Bad Request',
		});
	}

	const slug = await add(env, ctx.props.body.data);

	if (slug) {
		return ResponseJson(req, env, { slug });
	}
}
