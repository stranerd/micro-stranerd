import { Media } from '../types'
import { BaseEntity } from '@utils/commons'

export class ChatEntity extends BaseEntity {
	public readonly id: string
	public readonly from: string
	public readonly to: string
	public readonly content: string
	public readonly media: Media | null
	public readonly sessionId: string | null
	public readonly createdAt: number
	public readonly updatedAt: number
	public readonly readAt: number | null

	constructor ({ id, from, to, content, media, sessionId, createdAt, updatedAt, readAt }: ChatConstructorArgs) {
		super()
		this.id = id
		this.from = from
		this.to = to
		this.content = content
		this.media = media
		this.sessionId = sessionId
		this.createdAt = createdAt
		this.updatedAt = updatedAt
		this.readAt = readAt
	}
}

type ChatConstructorArgs = {
	id: string
	from: string
	to: string
	content: string
	media: Media | null
	createdAt: number
	updatedAt: number
	readAt: number | null
	sessionId: string | null
}
