import { validateData } from '@lib/utils'
import { acceptUserEmail } from '@lib/schemas'
import { fail, type Actions } from '@sveltejs/kit'

export const actions: Actions = {
	register: async ({ request }) => {
		console.log('Routes')
		const { formData, errors } = await validateData(await request.formData(), acceptUserEmail)

		if (errors) {
			console.log('failing')
			console.log(errors)
			return fail(400, {
				data: formData,
				errors,
			})
		}
		return { success: true, data: formData }
	},
}
