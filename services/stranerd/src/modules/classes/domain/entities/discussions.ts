import { Media, UserBio, UserRoles } from '../types'
import { BaseEntity } from '@utils/commons'

export class DiscussionEntity extends BaseEntity {
	public readonly id: string
	public readonly userId: string
	public readonly userBio: UserBio
	public readonly userRoles: UserRoles
	public readonly content: string
	public readonly media: Media | null
	public readonly links: string[]
	public readonly groupId: string
	public readonly classId: string
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id,
		             userId,
		             userBio,
		             userRoles,
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
		this.userId = userId
		this.userBio = userBio
		this.userRoles = userRoles
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
	userId: string
	userBio: UserBio
	userRoles: UserRoles
	content: string
	media: Media | null
	links: string[]
	groupId: string
	classId: string
	createdAt: number
	updatedAt: number
}
