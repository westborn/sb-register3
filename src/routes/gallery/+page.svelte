<script lang="ts">
	import { GalleryView } from '@lib/Components'
	import exhibits from './SB-Exhibits-2023.json'

	const photos = exhibits.map((entry) => {
		return {
			imageWidth: entry.imageWidth,
			imageHeight: entry.imageHeight,
			title: entry.title,
			imageURL: entry.imageURL,
			artistName: entry.artistName,
			description: entry.description,
			size: entry.size,
			price: entry.price,
			inOrOut: entry.inOrOut,
			material: entry.material,
			exhibitNumber: entry.exhibitNumber,
		}
	})
</script>

<p class="text-2xl">Gallery</p>

<GalleryView {photos} baseHeight={200} gutter={8} photoClass="photo" />
