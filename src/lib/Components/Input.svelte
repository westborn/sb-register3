<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements'

	interface IInput extends HTMLInputAttributes {
		label?: string
		color?: 'primary' | 'secondary' | 'error'
		type?: string
		name: string
		classes?: string
		inputSize?: 'xs' | 'sm' | 'md' | 'lg'
		errors?: string[]
	}

	export let label: string | undefined = undefined

	export let color: 'primary' | 'secondary' | 'error' = 'primary'
	export let type: string = 'text'
	export let classes: string = ''
	export let inputSize: 'xs' | 'sm' | 'md' | 'lg' = 'md'
	export let name: string
	export let errors: string[] | undefined

	const sizeClasses = {
		xs: 'py-1.5 px-2.5 text-sm',
		sm: 'py-2 px-3 text-sm',
		md: 'py-2.5 px-4 text-base',
		lg: 'py-3.5 px-5 text-lg',
	}

	const colorClasses = {
		primary: 'focus:ring-primary-500 focus:border-primary-500 border-gray-200',
		secondary: 'focus:ring-secondary-500 focus:border-secondary-500 border-gray-100',
		error: 'focus:ring-error-500 focus:border-error-500 border-error-500',
	}

	let inputClass: string
	const defaultClasses =
		' w-full rounded-md shadow-sm border bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 block'
	$: inputClass = defaultClasses + colorClasses[color] + sizeClasses[inputSize] + classes
</script>

<div class="">
	{#if label}
		<label for={name} class="block text-sm font-medium text-primary-200 sm:mt-px sm:pt-2"
			>{label}</label
		>
	{/if}
	<div class="{label ? 'mt-1' : 'mt-0'} group">
		<input {type} {name} id={name} class={inputClass} {...$$restProps} />
	</div>
	{#if errors}
		{#each errors as error}
			<label for={name} class="py-0 pt-1">
				<span class="block text-sm font-medium  text-red-500 sm:mt-px sm:pt-2">
					{error}
				</span>
			</label>
		{/each}
	{/if}
</div>
