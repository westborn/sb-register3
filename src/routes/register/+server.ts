import type { RequestHandler } from './$types'
import { SECRET_WEBAPP_API_URL } from '$env/static/private'

// send a post request to the google sheet backend web app
// use the search param to determine which function to call on the backend
// fetch has to be a stringified json object and text/plain to avoid CORS issues

export const POST: RequestHandler = async ({ request }) => {
	console.log('+Server.ts')
	const data = await request.json()
	console.log(data)
	console.log(SECRET_WEBAPP_API_URL)
	const response = await fetch(SECRET_WEBAPP_API_URL, {
		method: 'POST',
		headers: { 'Content-Type': 'text/plain' },
		body: JSON.stringify(data),
	})
	const res = await response.json()
	console.log('server data')
	console.log(res)
	return new Response(JSON.stringify(res))
}
