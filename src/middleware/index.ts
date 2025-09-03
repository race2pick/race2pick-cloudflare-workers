export default function applyMiddleware<Env>(
  handler: FetchHandler<Env>,
  middlewares: Array<(h: FetchHandler<Env>) => FetchHandler<Env>>
): FetchHandler<Env> {
  return middlewares.reduceRight((h, mw) => mw(h), handler);
}