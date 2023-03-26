<script lang="ts">
	import { GalleryView } from '@lib/Components'
	import photos from '$lib/photos.json'
</script>

<p class="text-2xl">Gallery</p>

<GalleryView {photos} baseHeight={320} gutter={4} photoClass="photo" onPhotoClick={console.log} />
