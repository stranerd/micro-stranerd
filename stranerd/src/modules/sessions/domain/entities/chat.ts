import { Media } from '../types/common'
import { BaseEntity } from '@utils/commons'

export class ChatEntity extends BaseEntity {
	public readonly id: string
	public readonly content: string | null
	public readonly media: Media | null
	public readonly from: string
	public readonly sessionId: string | null
	public readonly createdAt: number
	public readonly updatedAt: number
	public readonly readAt: number | null

	constructor ({ id, content, media, from, sessionId, createdAt, updatedAt, readAt }: ChatConstructorArgs) {
		super()
		this.id = id
		this.content = content
		this.media = media
		this.from = from
		this.sessionId = sessionId
		this.createdAt = createdAt
		this.updatedAt = updatedAt
		this.readAt = readAt
	}

	get isMedia () {
		return !!this.media
	}

	get isRead () {
		return !!this.readAt
	}

	get isImage () {
		return this.media && this.media.type.startsWith('image/')
	}
}

type ChatConstructorArgs = {
	id: string,
	content: string | null,
	media: Media | null,
	createdAt: number
	updatedAt: number
	readAt: number | null
	from: string
	sessionId: string | null
}
