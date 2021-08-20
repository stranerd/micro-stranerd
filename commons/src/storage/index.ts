export interface StorageFile {
	name: string,
	mimeType: string
	size: number
	isTruncated: boolean
	data: Buffer
}

export interface MediaOutput {
	name: string
	mimeType: string
	size: number
	path: string
	timestamp: number
}