<script lang="ts">
	import { registrationWithEntriesSchema } from '@lib/schemas'

	export let data: any

	let parseResult: any
	parseResult = registrationWithEntriesSchema.safeParse(data.data)
	$: dispRes = parseResult.success
		? parseResult
		: parseResult.error.issues.map((e: any) => ({ path: e.path[0], message: e.message }))
</script>

<h1 class="text-primary-500 text-2xl font-bold">Welcome to SvelteKit</h1>
<p class="text-accent-500 font-bold">
	Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation
</p>

{#if data?.result != 'ok'}
	<p>Server Error Occurred: {data.data}</p>
{:else}
	<pre>{JSON.stringify(dispRes, null, 2)}</pre>
	<pre> {JSON.stringify(data, null, 2)}</pre>
{/if}
<!-- else content here -->
