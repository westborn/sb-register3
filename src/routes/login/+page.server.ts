import { fail } from '@sveltejs/kit'
import type { Actions } from './$types'

export const actions: Actions = {
	async login({ request, url, locals: { supabase } }) {
		const formData = await request.formData()
		const email = formData.get('email') as string

		const { error } = await supabase.auth.signInWithOtp({
			email,
			options: {
				emailRedirectTo: `${url.origin}/register`,
			},
		})

		if (error) {
			return fail(400, {
				error: error.message,
				values: { email },
			})
		}

		return {
			success: true,
			message: 'Please check your email for a magic link to log into the website.',
		}
	},
}
