import { generateSlug } from './slug';

const expirationTtl = 60 * 60 * 24 * 60; // 2 months

export async function getDataWhenExists(env: Env, data: string): Promise<string | null> {
	return env.kvShortenerReverse.get(data);
}

export async function isSlugExists(env: Env, slug: string): Promise<boolean> {
	const result = await env.kvShortener.get(slug);

	return !!result;
}

export async function add(env: Env, data: string): Promise<string> {
	const slugFromExist = await getDataWhenExists(env, data);

	if (slugFromExist) {
		return slugFromExist;
	}

	let slug = await generateSlug(data);

	const isExists = await isSlugExists(env, slug);

	/**
	 * If slug already exists, generate new slug with 7 characters
	 */
	if (isExists) {
		slug = await generateSlug(data, 7);
	}

	await env.kvShortener.put(slug, data, { expirationTtl });
	await env.kvShortenerReverse.put(data, slug, { expirationTtl });

	return slug;
}

export default async function read(env: Env, slug: string) {
	return env.kvShortener.get(slug);
}
