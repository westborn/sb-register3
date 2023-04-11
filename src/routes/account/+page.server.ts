import { fail, redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'

export const load = (async ({ locals: { supabase, getSession } }) => {
	const getProfile = async (id: string) => {
		try {
			const res = await supabase.from('profiles').select('*').eq('id', id).single()
			return res
		} catch (error) {
			throw new Error(`WTF: ${error}`)
		}
	}

	const session = await getSession()

	if (!session) {
		throw redirect(303, '/')
	}
	const result = await getProfile(session.user.id)
	if (result.status == 200) {
		return { session, profile: result.data }
	}
}) satisfies PageServerLoad

export const actions = {
	update: async ({ request, locals: { supabase, getSession } }) => {
		const formData = await request.formData()
		const firstName = formData.get('firstName') as string
		const lastName = formData.get('lastName') as string
		const postcode = formData.get('postcode') as string

		const session = await getSession()

		const { error } = await supabase.from('profiles').upsert({
			id: session?.user.id,
			firstName,
			lastName,
			postcode,
			updated_at: new Date(),
		})

		if (error) {
			return fail(500, {
				firstName,
				lastName,
				postcode,
			})
		}

		return {
			firstName,
			lastName,
			postcode,
		}
	},
	signout: async ({ locals: { supabase, getSession } }) => {
		const session = await getSession()
		if (session) {
			await supabase.auth.signOut()
			throw redirect(303, '/')
		}
	},
} satisfies Actions
