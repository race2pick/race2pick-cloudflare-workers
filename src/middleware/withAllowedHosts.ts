import { ResponseText } from '../utils/networks';

export default function withAllowedHosts(handler: FetchHandler<Env>) {
	return async (request: Request, env: Env, ctx: ExecutionContext) => {
		const allowedHosts = JSON.parse(env.ALLOWED_HOSTS) as string[];
		const isProd = env.ENVIRONMENT === 'production';
		const origin = request.headers.get('origin') ?? '';
		const referer = request.headers.get('referer') ?? '';

		const ALLOWED_ORIGINS = allowedHosts.filter((host) => host !== 'localhost');
		const allowLocalHost = allowedHosts.includes('localhost');

		const isAllowed =
			ALLOWED_ORIGINS.includes(origin) ||
			ALLOWED_ORIGINS.includes(referer) ||
			(allowLocalHost && (origin.startsWith('http://localhost:') || referer.startsWith('http://localhost:')));

		if (isProd && !isAllowed) {
			return ResponseText(request, env, null, {
				status: 403,
				statusText: 'Forbidden',
			});
		}

		return handler(request, env, ctx);
	};
}
