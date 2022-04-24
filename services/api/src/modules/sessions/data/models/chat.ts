import { Media } from '../../domain/types'

export interface ChatFromModel extends ChatToModel {
	_id: string
	path: [string, string]
	readAt: number | null,
	createdAt: number
	updatedAt: number
}

export interface ChatToModel {
	content: string
	media: Media | null
	sessionId: string | null
}