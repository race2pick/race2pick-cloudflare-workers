import { NotFound } from '../utils/networks';

export default function withGetSlug(handler: FetchHandler<Env>) {
	return async (request: Request, env: Env, ctx: ExecutionContext) => {
		if (request.method.toLocaleUpperCase() === 'GET') {
			const url = new URL(request.url);
			if (url.pathname === '/') {
				return NotFound(request, env);
			}
			const slugs = url.pathname.split('/').filter((slug) => slug);

			if (slugs.length > 1) {
				return NotFound(request, env);
			}

			if (typeof ctx.props === 'object') {
				ctx.props = { ...ctx.props, params: { slug: slugs[0] } };
			} else {
				ctx.props = { slug: slugs[0] };
			}
		}

		return handler(request, env, ctx);
	};
}
