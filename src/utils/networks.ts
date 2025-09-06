function corsHeaders(request: Request, env: Env) {
	const allowedHosts = JSON.parse(env.ALLOWED_HOSTS) as string[];

	const origin = request.headers.get('origin') ?? '';

	const ALLOWED_ORIGINS = allowedHosts.filter((host) => host !== 'localhost');
	const allowLocalHost = allowedHosts.includes('localhost');

	let corsOrigin = '';
	if (ALLOWED_ORIGINS.includes(origin) || (allowLocalHost && origin.startsWith('http://localhost:'))) {
		corsOrigin = origin;
	}

	return {
		...(corsOrigin ? { 'Access-Control-Allow-Origin': corsOrigin } : {}),
		'Access-Control-Allow-Headers': request.headers.get('Access-Control-Request-Headers') || '',
	};
}

export function ResponseJson(request: Request, env: Env, data: Record<string, any> | any[], init?: ResponseInit): Response {
	return Response.json(data, {
		...(init ? init : {}),
		headers: {
			...(init?.headers ? init.headers : {}),
			...corsHeaders(request, env),
		},
	});
}

export function ResponseText(request: Request, env: Env, data: any, init?: ResponseInit): Response {
	return new Response(data, {
		...(init ? init : {}),
		headers: {
			...(init?.headers ? init.headers : {}),
			...corsHeaders(request, env),
		},
	});
}

export function NotFound(request: Request, env: Env): Response {
    return new Response(null, {
        status: 404,
        statusText: 'Not Found',
        headers: {
            ...corsHeaders(request, env),
        },
    });
}
