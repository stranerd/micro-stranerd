export interface StorageFile {
	name: string
	type: string
	size: number
	isTruncated: boolean
	data: Buffer
}

export interface MediaOutput {
	name: string
	type: string
	size: number
	path: string
	timestamp: number
	link: string
}