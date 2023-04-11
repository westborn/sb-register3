<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements'

	interface IInput extends HTMLInputAttributes {
		label?: string
		type?: string
		name: string
		classes?: string
		inputSize?: 'xs' | 'sm' | 'md' | 'lg'
		errors?: string[]
	}

	export let label: string | undefined = undefined

	export let type: string = 'text'
	export let classes: string = ''
	export let inputSize: 'xs' | 'sm' | 'md' | 'lg' = 'md'
	export let name: string
	export let errors: string[] | undefined

	const sizeClasses = {
		xs: ' py-1.5 px-2.5 text-sm ',
		sm: ' py-2 px-3 text-sm ',
		md: ' py-2.5 px-4 text-base ',
		lg: ' py-3.5 px-5 text-lg ',
	}

	let inputClass: string
	$: inputClass = 'input' + sizeClasses[inputSize] + ' ' + classes
</script>

<div class="">
	{#if label}
		<label for={name} class="label">{label}</label>
	{/if}
	<div class="{label ? 'mt-1' : 'mt-0'} group">
		<input {type} {name} id={name} class={inputClass} {...$$restProps} />
	</div>
	{#if errors}
		{#each errors as error}
			<label for={name} class="label">
				<span class="block text-sm font-medium text-red-500 sm:mt-px sm:pt-2">
					{error}
				</span>
			</label>
		{/each}
	{/if}
</div>
