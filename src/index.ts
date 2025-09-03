/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.jsonc`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import getHandler from './methods/getHandler';
import postHandler from './methods/postHandler';
import applyMiddleware from './middleware';
import withAllowedHosts from './middleware/withAllowedHosts';
import withAllowedMethods from './middleware/withAllowedMethods';
import withCheckDefaultData from './middleware/withCheckDefaultData';
import withGetSlug from './middleware/withGetSlug';
import withPostJson from './middleware/withPostJson';

async function mainHandler(request: Request, env: Env, ctx: ExecutionContext) {
	const method = request.method.toUpperCase();

	let response: Response | undefined | void;

	if (method === 'GET') {
		response = await getHandler(request, env, ctx);
	} else if (method === 'POST') {
		response = await postHandler(env, ctx);
	} else {
		return new Response(null, { status: 405, statusText: 'Method Not Allowed' });
	}

	if (response instanceof Response) {
		return response;
	}

	return new Response(null, { status: 404, statusText: 'Not Found' });
}

export default {
	fetch: applyMiddleware(mainHandler, [withAllowedHosts, withAllowedMethods, withGetSlug, withPostJson, withCheckDefaultData]),
} satisfies ExportedHandler<Env>;
