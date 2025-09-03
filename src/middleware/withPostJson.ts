export default function withPostJson(handler: FetchHandler<Env>) {
	return async (request: Request, env: Env, ctx: ExecutionContext) => {
		if (request.method.toLocaleUpperCase() === 'POST') {
			const contentType = request.headers.get('content-type') || '';

			if (!contentType.includes('application/json')) {
				return new Response(null, {
					status: 415,
					statusText: 'Unsupported Media Type',
				});
			}

			try {
				const body = await request.json();

				if (typeof ctx.props === 'object') {
					ctx.props = { ...ctx.props, body };
				} else {
					ctx.props = { body };
				}
			} catch {
				return new Response(null, {
					status: 400,
					statusText: 'Bad Request',
				});
			}
		}

		return handler(request, env, ctx);
	};
}
