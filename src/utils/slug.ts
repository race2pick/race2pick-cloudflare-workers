export function toBase62(buf: ArrayBuffer): string {
	const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	const bytes = new Uint8Array(buf);
	let num = BigInt('0x' + [...bytes].map((b) => b.toString(16).padStart(2, '0')).join(''));

	let result = '';
	while (num > 0n) {
		const rem = num % 62n;
		result = chars[Number(rem)] + result;
		num = num / 62n;
	}
	return result;
}

export async function generateSlug(input: string, length = 6): Promise<string> {
	const encoder = new TextEncoder();
	const salt = crypto.randomUUID();
	const data = encoder.encode(input + salt);

	const hash = await crypto.subtle.digest('SHA-256', data);
	const base62 = toBase62(hash);

	return base62.slice(0, length);
}
