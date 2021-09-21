import { Media } from '../../domain/types'

export interface ChatFromModel extends ChatToModel {
	_id: string
	path: [string, string]
	readAt: number | null,
	createdAt: number
	updatedAt: number
}

export interface ChatToModel {
	content: string | null
	media: Media | null
	sessionId: string | null
}