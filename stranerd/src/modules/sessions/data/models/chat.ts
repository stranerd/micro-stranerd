import { Media } from '@modules/sessions/domain/types/common'

export interface ChatFromModel extends ChatToModel {
	_id: string
	path: string
	readAt: number | null,
	createdAt: number
	updatedAt: number
}

export interface ChatToModel {
	content: string | null
	media: Media | null
	from: string
	sessionId: string | null
}

