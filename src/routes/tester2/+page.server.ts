import type { PageServerLoad } from './$types'
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public'
import { createClient } from '@supabase/supabase-js'

export const load = (async () => {
	const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY)

	/**
	 * a little helper that is written for convenience so that instead
	 * of calling `const { data: { session } } = await supabase.auth.getSession()`
	 * you just call this `await getSession()`
	 */
	// const getSession = async () => {
	// 	const {
	// 		data: { session },
	// 	} = await supabase.auth.getSession()
	// 	return session
	// }

	// const session = await getSession()

	// if (!session) {
	// 	throw redirect(303, '/')
	// }

	// const data = await supabase.from('test2').select('*')

	// console.log(JSON.stringify(data, null, 2))
	// if (!data) {
	// 	throw new Error(`wtf: ${JSON.stringify(data, null, 2)}`)
	// }

	return supabase.from('profiles').select('*')
}) satisfies PageServerLoad
