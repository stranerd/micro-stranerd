import { EmbeddedUser } from '../../domain/types'

export interface NoteFromModel extends NoteToModel {
	_id: string
	createdAt: number
	updatedAt: number
}

export interface NoteToModel {
	isPrivate: boolean
	user: EmbeddedUser
	title: string
	content: string
	links: { original: string, normalized: string }[]
}