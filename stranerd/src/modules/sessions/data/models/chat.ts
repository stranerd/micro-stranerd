import { Media } from '@modules/sessions/domain/types/common'


export interface ChatFromModel {
	_id: string
	content?: string
	media?: Media
	from: string
	sessionId?: string
	readAt?: number,
	createdAt: number
}

export interface ChatToModel {
	content?: string
	media?: Media
	from: string
	sessionId?: string
	readAt?: number,
}

