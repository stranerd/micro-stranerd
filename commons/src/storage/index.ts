export interface StorageFile {
	name: string,
	mimeType: string
	size: number
	isTruncated: boolean
	data: Buffer
}