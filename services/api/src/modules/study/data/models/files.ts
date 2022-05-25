import { EmbeddedUser, Media } from '../../domain/types'

export interface FileFromModel extends FileToModel {
	_id: string
	createdAt: number
	updatedAt: number
}

export interface FileToModel {
	isPrivate: boolean
	user: EmbeddedUser
	media: Media | null
	title: string
	content: string
	links: { original: string, normalized: string }[]
}