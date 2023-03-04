import type { PageLoad } from './$types'

/* eslint-disable max-len */
const SECRET_WEBAPP_API_URL =
	//PROD
	// 	'https://script.google.com/macros/s/AKfycbyNmOoZjkfN9w3-dEH4E0GupbASgwl8-7Rv6kgz0jHHqE7kKeBYKsxFl4ELTdwnrtM4/exec'

	// DEV
	'https://script.google.com/macros/s/AKfycbzecQpGn-nJNf06HOZYt1E191pKW6j_wlUlpV6I0lTy8AgyeeKJKjW1YjYUjPt1YwLBCg/exec'
/* eslint-enable max-len */

export const load = (async () => {
	const res = await fetch(SECRET_WEBAPP_API_URL, {
		method: 'POST',
		headers: { 'Content-Type': 'text/plain' },
		body: JSON.stringify({
			action: 'getDetailsByEmail',
			data: {
				email: 'qgeorge@westborn.com.au',
			},
		}),
	})
	const data = await res.json()
	return data
}) satisfies PageLoad
