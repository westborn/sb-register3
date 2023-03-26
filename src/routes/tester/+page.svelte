<!-- +page.svelte -->
<script lang="ts">
	import { errors } from '../../lib/stores'
</script>

<!-- <script lang="ts">
	import { invalidateAll } from '$app/navigation'
	import { page } from '$app/stores'
	import type { PageData } from './$types'

	export let data: PageData

	$: message = data.message

	function handleclick() {
		console.log('click', data.message)
		message = 'from child'
		invalidateAll()
	}
</script>

<h4 class="p-6">Tester Page</h4>
<p class="p-6">child data {message}</p>

<button on:click={handleclick}>Click Me</button> -->

<button on:click={() => ($errors = 'A')}> Add A </button>
<button on:click={() => ($errors = 'Bb')}> Add B </button>
<button on:click={() => errors.set('oh no')}> Add error </button>
