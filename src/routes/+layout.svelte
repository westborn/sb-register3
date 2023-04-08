<script lang="ts">
	// Your selected Skeleton theme:
	// This contains the bulk of Skeletons required styles:
	import '@skeletonlabs/skeleton/styles/all.css'
	import '../skeletonTheme.css'
	// Finally, your application's global stylesheet (sometimes labeled 'app.css')
	import '../app.css'

	// import { invalidate } from '$app/navigation'
	// import { onMount } from 'svelte'
	// import type { LayoutData } from './$types'

	// export let data: LayoutData

	// $: ({ supabase } = data)

	// onMount(() => {
	// 	const {
	// 		data: { subscription },
	// 	} = supabase.auth.onAuthStateChange(() => {
	// 		invalidate('supabase:auth')
	// 	})

	// 	return () => subscription.unsubscribe()
	// })
</script>

<h1>Primary Layout</h1>
<slot />
