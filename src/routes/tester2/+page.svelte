<!-- +page.svelte -->
<script lang="ts">
	export let data
</script>

<h1>tester2</h1>

<pre>{JSON.stringify(data.data, null, 2)}</pre>

<p>{Object.keys(data)}</p>
