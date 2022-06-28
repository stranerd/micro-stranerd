import { ChatData, EmbeddedUser, Media } from '../../domain/types'

export interface ChatFromModel extends ChatToModel {
	_id: string
	readAt: Record<string, number>
	createdAt: number
	updatedAt: number
}

export interface ChatToModel {
	from: EmbeddedUser
	to: string
	media: Media | null
	body: string
	links: { original: string, normalized: string }[]
	data: ChatData
}