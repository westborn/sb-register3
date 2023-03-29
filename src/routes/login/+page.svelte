<script lang="ts">
	import { applyAction, enhance, type SubmitFunction } from '$app/forms'

	let loading = false

	const submitLogin: SubmitFunction = () => {
		loading = true
		return async ({ result, update }) => {
			switch (result.type) {
				case 'success':
					console.log('A magic link has been sent')
					break
				case 'error':
					console.log('An error happened')

					break
				default:
					await applyAction(result)
			}
			await update()
			loading = false
		}
	}
</script>

<form
	method="POST"
	action="?/login"
	class="mx-auto mt-12 w-full max-w-lg"
	use:enhance={submitLogin}
>
	<h1 class="text-center text-3xl font-medium dark:text-white">Login</h1>
	<p class="text-center dark:text-white">We will send you a magic link to login!</p>
	<div class="mb-6 grid gap-6 ">
		<div>
			<label for="email" class="mb-2">Email</label>
			<input type="text" id="email" name="email" required disabled={loading} />
		</div>
		<button type="submit" disabled={loading} class="w-full">
			{#if loading}
				Loading ...
			{:else}
				Submit
			{/if}
		</button>
	</div>
</form>
