<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms'
	import type { acceptUserEmailMessage, registrationWithEntriesRecord } from '@lib/schemas'
	import { Input } from '$lib/Components'
	import type { ActionData } from './$types'
	export let form: ActionData

	let data: registrationWithEntriesRecord
	let fetchResult: string
	$: dispData = data

	let loading = false

	let btnClasses =
		'text-sm rounded-md bg-primary-300 px-5 py-1 font-semibold text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-400 hover:shadow-lg focus:bg-primary-400 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-200 active:shadow-lg'

	async function getDetailsByEmail(messageData: acceptUserEmailMessage) {
		loading = true
		const res = await fetch('/register', {
			method: 'POST',
			body: JSON.stringify({
				action: 'getDetailsByEmail',
				data: messageData,
			}),
		})
		console.log('response', res)
		const response = await res.json()
		fetchResult = response.result
		data = { ...response.data }
		loading = false
	}

	const something: SubmitFunction = (input) => {
		// console.log('something Input')
		// console.log(Object.fromEntries(input?.data))
		// do something after the form submits

		return async ({ result, update }) => {
			console.log('something Result')
			console.log(result)
			switch (result.type) {
				case 'success':
					console.log('Success')
					await update()
					getDetailsByEmail(form?.data)
					break
				case 'failure':
					console.log('Something Failing')
					await update()
					break
				case 'redirect':
					console.log('Something Redirecting')
					await update()
					break
				case 'error':
					console.log('Something Erroring')
					await update()
					break

				default:
					await update()
			}
		}
	}
</script>

<h1 class="text-2xl font-bold text-primary-500">Welcome to SvelteKit</h1>
<p class="font-bold text-accent-500">
	Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation
</p>

<section class="container mx-auto max-w-prose px-3">
	<p class="mt-3">
		Hi Artists<br /><br />

		The process of registration for the 2023 exhibition (March 11th - 19th) has changed a little
		from last year. We trust these changes make the process a little easier for you.<br /><br />
		There is a 4 step process comprising:<br />
	</p>
	<ul class="list-outside list-disc px-4">
		<li>Register - just your name, email and postcode to let us know you may be exhibiting</li>
		<li>
			Add entries - details of each entry you'd like to submit. You can add as many as you like and
			you can edit/delete them too.
		</li>
		<li>Confirm some additional information - bank details, assistance required etc</li>
		<li>
			Complete your registration - after you've added all of your entries and are ready to pay the
			registration fee.
		</li>
	</ul>
</section>
<section class="container mx-auto max-w-prose px-3">
	<div class="mt-10 w-full">
		<form
			action="?/register"
			method="POST"
			use:enhance={something}
			class="w-full flex-auto flex-col items-center space-y-2 pt-4"
		>
			<Input
				color="primary"
				name="email"
				type="email"
				label="Email"
				value={form?.data?.email ?? data?.registration?.email}
				errors={form?.errors?.fieldErrors?.email}
				disabled={loading}
			/>
			<div class="mt-6 flex justify-between">
				<button type="submit" class={btnClasses}>New Registration </button>

				<!-- <button type="button" on:click={() => submitRegister('view')} class={btnClasses}
					>View Registration
				</button>

				<button type="button" on:click={() => submitRegister('registration')} class={btnClasses}
					>Continue Registering</button
				>
			</div> -->
			</div>
		</form>

		{#if loading}
			<div
				style="border-top-color:transparent"
				class="m-6 h-16 w-16 animate-spin rounded-full border-8 border-solid border-accent"
			/>
		{/if}
	</div>
</section>

<pre> {JSON.stringify(fetchResult, null, 2)}</pre>
<pre> {JSON.stringify(data?.registration.registrationId, null, 2)}</pre>
<pre> {JSON.stringify(form, null, 2)}</pre>
