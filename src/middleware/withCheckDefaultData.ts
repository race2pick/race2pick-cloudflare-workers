interface Params {
	slug: string;
}

interface Body {
	data: string;
}

interface Context extends ExecutionContext {
	props: {
		params?: Params;
		body?: Body;
	};
}

export default function withCheckDefaultData(handler: FetchHandler<Env>) {
	return async (request: Request, env: Env, ctx: Context) => {
		const defaultData = env.DEFAULT_DATA;
		const defaultSlug = env.DEFAULT_SLUG;

		const method = request.method.toUpperCase();

		const { body, params } = ctx.props || {};

		if (method === 'POST' && body?.data === defaultData) {
			return Response.json({ slug: defaultSlug });
		}

		if (method === 'GET' && params?.slug === defaultSlug) {
			return new Response(JSON.stringify({ data: defaultData }), {
				headers: {
					'content-type': 'application/json',
					'Cache-Control': 'public, max-age=60',
				},
			});
		}

		return handler(request, env, ctx);
	};
}
