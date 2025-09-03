import { add } from '../utils/kv';

interface Body {
	data: string;
}

interface Context extends ExecutionContext {
	props: {
		body: Body;
	};
}

export default async function postHandler(env: Env, ctx: Context): Promise<Response | undefined | void> {
	if (typeof ctx.props?.body?.data !== 'string') {
		return new Response(null, {
			status: 400,
			statusText: 'Bad Request',
		});
	}

	const slug = await add(env, ctx.props.body.data);

	if (slug) {
		return Response.json({ slug });
	}
}
