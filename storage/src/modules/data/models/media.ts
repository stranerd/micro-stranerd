import { StorageFile } from '@utils/commons'

export interface MediaInput extends StorageFile {
}

export interface MediaOutput {
	name: string
	path: string
	mimeType: string
	size: number
	timestamp: number
}