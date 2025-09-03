export {};

declare global {
	type FetchHandler<Env = unknown> = (request: Request, env: Env, ctx: ExecutionContext) => Response | Promise<Response>;
}
