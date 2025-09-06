import { ResponseText } from '../utils/networks';

export default function withAllowedMethods(handler: FetchHandler<Env>) {
	return async (request: Request, env: Env, ctx: ExecutionContext) => {
		const method = request.method.toUpperCase();

		if (!['POST', 'GET', 'OPTIONS'].includes(method)) {
			return ResponseText(request, env, null, {
				status: 405,
				statusText: 'Method Not Allowed',
			});
		}

		if (method === 'OPTIONS') {
			const ALLOWED_ORIGINS = ['https://race2pick.github.io'];
			const origin = request.headers.get('Origin') || '';
			let corsOrigin = '';

			if (ALLOWED_ORIGINS.includes(origin) || origin.startsWith('http://localhost:')) {
				corsOrigin = origin;
			}

			return new Response(null, {
				headers: {
					'Access-Control-Allow-Origin': corsOrigin,
					'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
					'Access-Control-Allow-Headers': request.headers.get('Access-Control-Request-Headers') || '',
					'Access-Control-Max-Age': '86400',
				},
			});
		}

		return handler(request, env, ctx);
	};
}
