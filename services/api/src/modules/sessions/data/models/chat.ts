import { Media } from '../../domain/types'

export interface ChatFromModel extends ChatToModel {
	_id: string
	readAt: number | null,
	createdAt: number
	updatedAt: number
}

export interface ChatToModel {
	from: string
	to: string
	content: string
	media: Media | null
	sessionId: string | null
}