<!-- <script lang="ts">
	import { page } from '$app/stores'
	import type { LayoutData } from './$types'

	// export let data: LayoutData

	$: message = $page.data.message
</script>

<h3 class="p-6">Layout</h3>

<p>layout data : {message}</p>

<slot /> -->
<script lang="ts">
	import { errors } from '../../lib/stores'
	$: xx = console.log(errors)
</script>

<p>{JSON.stringify($errors, null, 2)}</p>

<!-- content here -->
{#if $errors === 'A'}
	<p>We got A</p>
{/if}
{#if $errors === 'Bb'}
	<p>We got B {xx}</p>
{/if}

<div class="error">Layout - {$errors}</div>
<slot />
