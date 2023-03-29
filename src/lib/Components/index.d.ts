import GalleryView from './GalleryView.svelte'

export interface Photo {
	imageWidth: number
	imageHeight: number
	title: string
	imageURL: string | Promise<string>
	artistName: string
	description: string
	size: string
	price: string
	inOrOut: string
	material: string
	exhibitNumber: string
	/**
	 * Any properties could be useful in callback function onPhotoClick.
	 */
	[key: string]: unknown
}

export default GalleryView
