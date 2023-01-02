import { ChatData, EmbeddedUser, Media } from '../types'
import { BaseEntity } from '@utils/app/package'
import { generateDefaultUser } from '@modules/users'

export class ChatEntity extends BaseEntity {
	public readonly id: string
	public readonly from: EmbeddedUser
	public readonly to: string
	public readonly data: ChatData
	public readonly body: string
	public readonly media: Media | null
	public readonly links: { original: string, normalized: string }[]
	public readonly createdAt: number
	public readonly updatedAt: number
	public readonly readAt: Record<string, number>

	constructor ({ id, from, to, data, body, links, media, createdAt, updatedAt, readAt }: ChatConstructorArgs) {
		super()
		this.id = id
		this.from = generateDefaultUser(from)
		this.to = to
		this.data = data
		this.body = body
		this.links = links
		this.media = media
		this.createdAt = createdAt
		this.updatedAt = updatedAt
		this.readAt = readAt
	}
}

type ChatConstructorArgs = {
	id: string
	from: EmbeddedUser
	to: string
	data: ChatData
	body: string
	media: Media | null
	links: { original: string, normalized: string }[]
	createdAt: number
	updatedAt: number
	readAt: Record<string, number>
}
