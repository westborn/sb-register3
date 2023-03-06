import { fail } from '@sveltejs/kit'
import type { z, ZodError } from 'zod'
import type { ZodSchema } from 'zod/lib/types'

type ErrorWithMessage = {
	message: string
}

function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
	return (
		typeof error === 'object' &&
		error !== null &&
		'message' in error &&
		typeof (error as Record<string, unknown>).message === 'string'
	)
}

function toErrorWithMessage(maybeError: unknown): ErrorWithMessage {
	if (isErrorWithMessage(maybeError)) return maybeError

	try {
		return new Error(JSON.stringify(maybeError))
	} catch {
		// fallback in case there's an error stringifying the maybeError
		// like with circular references for example.
		return new Error(String(maybeError))
	}
}

function getErrorMessage(error: unknown) {
	return toErrorWithMessage(error).message
}

// export async function validateFormData(formData: FormData, schema: ZodSchema) {
// 	const body = Object.fromEntries(formData)

// 	const {formData, errors} = await schema.safeParseAsync(body)
// 	if (errors) {
// 		return fail(400, {
// 			data: formData,
// 			errors,
// 		})
// 	}

// 	return { formData: result.data, errors: {} }
// }

export const validateData = async <T extends z.ZodTypeAny>(
	formData: FormData,
	schema: T,
	zfd = false,
): Promise<{
	formData: z.infer<T>
	errors: z.inferFlattenedErrors<typeof schema> | null
}> => {
	console.log('ValidateData')
	// console.log(formData)
	if (zfd) {
		try {
			const data = schema.parse(formData)
			console.log(data)

			return {
				formData: data,
				errors: null,
			}
		} catch (err) {
			// console.log('Error: ', err)
			const errors = (err as ZodError).flatten()
			return {
				formData,
				errors,
			}
		}
	} else {
		const body = Object.fromEntries(formData)

		try {
			const data = schema.parse(body)
			return {
				formData: data,
				errors: null,
			}
		} catch (err) {
			// console.log('Error: ', err)
			const errors = (err as ZodError).flatten()
			return {
				formData: body,
				errors,
			}
		}
	}
}
