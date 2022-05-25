import { EmbeddedUser, Media } from '../../domain/types'

export interface DocumentFromModel extends DocumentToModel {
	_id: string
	createdAt: number
	updatedAt: number
}

export interface DocumentToModel {
	isPrivate: boolean
	user: EmbeddedUser
	media: Media | null
	title: string
	content: string
	links: { original: string, normalized: string }[]
}