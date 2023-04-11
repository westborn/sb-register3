<!-- src/routes/account/+page.svelte -->
<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms'
	import type { ActionData, PageData } from '../$types'

	export let data: PageData
	export let form: ActionData

	let { session, profile } = data

	let profileForm: any
	let loading = false
	let firstName: string | null = profile?.firstName
	let lastName: string | null = profile?.lastName
	let postcode: string | null = profile?.postcode

	const handleSubmit: SubmitFunction = (input) => {
		console.log('Account Input')
		console.log(form)
		console.log(Object.fromEntries(input?.data))
		loading = true
		return async () => {
			loading = false
		}
	}
</script>

<pre>{JSON.stringify(profile, null, 2)}</pre>

<div class="form-widget">
	<form
		class="form-widget"
		method="post"
		action="?/update"
		use:enhance={handleSubmit}
		bind:this={profileForm}
	>
		<div>
			<label class="label" for="email">Email</label>
			<input class="input" id="email" type="text" value={session?.user.email} disabled />
		</div>

		<div class="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
			<div>
				<label class="label" for="firstName">Full Name</label>
				<input
					class="input"
					id="firstName"
					name="firstName"
					type="text"
					value={form?.firstName ?? firstName}
				/>
			</div>

			<div>
				<label class="label" for="lastName">lastName</label>
				<input
					class="input"
					id="lastName"
					name="lastName"
					type="text"
					value={form?.lastName ?? lastName}
				/>
			</div>
		</div>

		<div class="w-24">
			<label class="label" for="postcode">postcode</label>
			<input
				class="input"
				id="postcode"
				name="postcode"
				type="text"
				value={form?.postcode ?? postcode}
			/>
		</div>

		<div>
			<input
				type="submit"
				class="button primary block"
				value={loading ? 'Loading...' : 'Update'}
				disabled={loading}
			/>
		</div>
	</form>

	<form method="post" action="?/signout" use:enhance={handleSubmit}>
		<div>
			<button class="button block" disabled={loading}>Sign Out</button>
		</div>
	</form>
</div>

<div>
	<div class="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
		<label class="label">
			<span>Website</span>
			<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
				<div class="input-group-shim">https://</div>
				<input type="text" placeholder="www.example.com" />
			</div>
		</label>
		<!-- --- -->
		<label class="label">
			<span>Amount</span>
			<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
				<div class="input-group-shim"><span>$</span></div>
				<input type="text" placeholder="Amount" />
				<select>
					<option>USD</option>
					<option>CAD</option>
					<option>EURO</option>
				</select>
			</div>
		</label>
		<!-- --- -->
		<label class="label">
			<span>Username</span>
			<div class="input-group input-group-divider grid-cols-[1fr_auto]">
				<input type="text" placeholder="Enter Username..." />
				<a href="/elements/forms" title="Username already in use.">
					<i class="fa-solid fa-circle-exclamation animate-pulse text-warning-500" />
				</a>
			</div>
		</label>
		<!-- --- -->
		<label class="label">
			<span>Search</span>
			<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
				<div class="input-group-shim"><i class="fa-solid fa-search" /></div>
				<input type="search" placeholder="Search..." />
				<button class="variant-filled-primary">Submit</button>
			</div>
		</label>
	</div>
</div>

<pre>{JSON.stringify(data?.profile, null, 4)}</pre>
<pre>{JSON.stringify(data?.session?.user?.email, null, 4)}</pre>
<pre>{JSON.stringify(form, null, 4)}</pre>
