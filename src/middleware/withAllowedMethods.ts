export default function withAllowedMethods(handler: FetchHandler<Env>) {
	return async (request: Request, env: Env, ctx: ExecutionContext) => {
		const method = request.method.toUpperCase();

		if (!['POST', 'GET'].includes(method)) {
			return new Response(null, {
				status: 405,
				statusText: 'Method Not Allowed',
			});
		}

		return handler(request, env, ctx);
	};
}
