export default function withAllowedHosts(handler: FetchHandler<Env>) {
	
	return async (request: Request, env: Env, ctx: ExecutionContext) => {
		const allowedHosts = JSON.parse(env.ALLOWED_HOSTS);
		const isProd = env.ENVIRONMENT === 'production';
		const origin = request.headers.get('origin');
		const referer = request.headers.get('referer');

		const isAllowed = (origin && allowedHosts.includes(new URL(origin).host)) || (referer && allowedHosts.includes(new URL(referer).host));

		if (isProd && !isAllowed) {
			return new Response(null, {
				status: 403,
				statusText: 'Forbidden',
			});
		}

		return handler(request, env, ctx);
	};
}
