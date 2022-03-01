import { Media, UserBio, UserRoles } from '../types'
import { BaseEntity } from '@utils/commons'

export class DiscussionEntity extends BaseEntity {
	public readonly id: string
	public readonly userId: string
	public readonly userBio: UserBio
	public readonly userRoles: UserRoles
	public readonly content: string | null
	public readonly media: Media | null
	public readonly groupId: string
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id,
		             userId,
		             userBio,
		             userRoles,
		             content,
		             media,
		             groupId,
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
		this.groupId = groupId
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}
}

type DiscussionConstructorArgs = {
	id: string,
	userId: string,
	userBio: UserBio,
	userRoles: UserRoles,
	content: string | null,
	media: Media | null,
	groupId: string
	createdAt: number
	updatedAt: number
}
