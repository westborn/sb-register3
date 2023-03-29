<script lang="ts">
	import { Image } from '$lib/Components'
	import type { Photo } from '$lib/Components/index.d'
	export let photos: Photo[] = []
	export let baseHeight: number = 200
	export let gutter: number = 2
	export let photoClass: string | undefined = undefined

	import { Modal } from '@lib/Components'
	import EntryCard from './EntryCard.svelte'
	let showModal = false
	let currentPhoto: Photo | undefined
	const handleToggleModal = (selectedPhoto: Photo | undefined) => {
		currentPhoto = selectedPhoto
		showModal = !showModal
	}
</script>

<Modal modalOpen={showModal} on:close={() => handleToggleModal(undefined)}>
	<svelte:fragment slot="body"><EntryCard {currentPhoto} /></svelte:fragment>
</Modal>

<div class="gallery">
	<div class="section" style="--gutter: {gutter}px;">
		{#each photos as photo}
			<button
				class={`image ${photoClass ?? ''}`}
				on:click={() => handleToggleModal(photo)}
				style="
					--ratio: {(photo.imageHeight * 100.0) / photo.imageWidth}%;
					--width: {(baseHeight * photo.imageWidth) / photo.imageHeight}px;
					--flex-grow: {(baseHeight * photo.imageWidth) / photo.imageHeight};
				"
			>
				<div class="spacer" />
				<Image src={photo.imageURL} title={photo.title} class="img lazyload" />
			</button>
		{/each}
		{#each new Array(10) as item}
			<div class="dummy" />
		{/each}
	</div>
</div>

<style>
	.section {
		display: flex;
		flex-wrap: wrap;
	}
	.gallery::after {
		content: '';
		flex-grow: 999999999;
		min-width: 200px;
		height: 0;
	}
	.image {
		flex-grow: var(--flex-grow);
		width: var(--width);
		margin: calc(var(--gutter) / 2);
		align-self: flex-start;
		position: relative;
		border: none;
	}
	.spacer {
		content: '';
		display: block;
		padding-bottom: var(--ratio);
	}
	.image :global(.img) {
		object-fit: cover;
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		vertical-align: bottom;
		border: 0;
	}
	.dummy {
		height: 0;
		width: 100px;
		flex-grow: 100;
	}
</style>
