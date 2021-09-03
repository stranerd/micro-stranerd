import { Media } from '@modules/sessions/domain/types/common'
import { BaseEntity } from '@utils/commons'

export class ChatEntity extends BaseEntity {
	public readonly _id: string
	public readonly content: string | undefined
	public readonly media: Media | undefined
	public readonly from: string
	public readonly sessionId: string | undefined
	public readonly createdAt: number
	public readonly readAt: number | undefined

	constructor ({ _id, content, media, from, sessionId, createdAt, readAt }: ChatConstructorArgs) {
		super()
		this._id = _id
		this.content = content
		this.media = media
		this.from = from
		this.sessionId = sessionId
		this.createdAt = createdAt
		this.readAt = readAt
	}

	get isMedia () {
		return !!this.media
	}

	get isRead () {
		return !!this.readAt
	}

	get isImage () {
		return this.isMedia && this.media?.type.startsWith('image/')
	}
}

type ChatConstructorArgs = {
	_id: string,
	content: string | undefined,
	media: Media | undefined,
	createdAt: number
	readAt: number | undefined
	from: string
	sessionId: string | undefined
}
