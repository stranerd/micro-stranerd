import { EmbeddedUser, Media } from '../types'
import { BaseEntity } from '@utils/commons'

export class DiscussionEntity extends BaseEntity {
	public readonly id: string
	public readonly user: EmbeddedUser
	public readonly content: string
	public readonly media: Media | null
	public readonly links: { original: string, normalized: string }[]
	public readonly groupId: string
	public readonly classId: string
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id,
		             user,
		             content,
		             media,
		             links,
		             groupId,
		             classId,
		             createdAt,
		             updatedAt
	             }: DiscussionConstructorArgs) {
		super()
		this.id = id
		this.user = user
		this.content = content
		this.media = media
		this.links = links
		this.groupId = groupId
		this.classId = classId
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}
}

type DiscussionConstructorArgs = {
	id: string
	user: EmbeddedUser
	content: string
	media: Media | null
	links: { original: string, normalized: string }[]
	groupId: string
	classId: string
	createdAt: number
	updatedAt: number
}
