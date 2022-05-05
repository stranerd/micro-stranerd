import { EmbeddedUser, Media } from '../../domain/types'

export interface NoteFromModel extends NoteToModel {
	_id: string
	createdAt: number
	updatedAt: number
}

export interface NoteToModel {
	isHosted: boolean
	link: string | null
	media: Media | null
	user: EmbeddedUser
	title: string
	description: string
}