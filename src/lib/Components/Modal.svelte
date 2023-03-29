<script>
	import { createEventDispatcher } from 'svelte'
	export let modalOpen = false
	const dispatch = createEventDispatcher()
</script>

<svelte:window
	on:keydown={() => {
		if (modalOpen) dispatch('close')
	}}
/>
{#if modalOpen}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		class="modal fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center p-8 lg:p-0"
		on:click={() => dispatch('close')}
	>
		<div class="modal-overlay fixed h-full w-full bg-gray-900 opacity-50" />
		<div
			class="z-50 mx-auto w-full overflow-y-auto  rounded-lg bg-white shadow-xl lg:h-max lg:w-1/2"
			on:keypress={() => dispatch('close')}
		>
			<div class="flex justify-end">
				<button class="mr-2 rounded-full p-2 hover:bg-gray-300" on:click={() => dispatch('close')}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="24px"
						viewBox="0 0 24 24"
						width="24px"
						fill="#000000"
						><path d="M0 0h24v24H0V0z" fill="none" /><path
							d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
						/></svg
					>
				</button>
			</div>
			<div class="content p-4">
				<slot name="body" />
			</div>
		</div>
	</div>
{/if}
