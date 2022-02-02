import { BaseEntity } from '@utils/commons'
import { UserBio } from '../types'

export class PlaylistEntity extends BaseEntity {
	public readonly id: string
	public readonly title: string
	public readonly description: string
	public readonly tags: string[]
	public readonly userId: string
	public readonly userBio: UserBio
	public readonly isPublic: boolean
	public readonly links: string[]
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id,
		             title,
		             description,
		             tags,
		             userId,
		             userBio,
		             isPublic,
		             links,
		             createdAt,
		             updatedAt
	             }: PlaylistConstructorArgs) {
		super()
		this.id = id
		this.title = title
		this.description = description
		this.tags = tags
		this.userId = userId
		this.userBio = userBio
		this.isPublic = isPublic
		this.links = links
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}
}

type PlaylistConstructorArgs = {
	id: string,
	isPublic: boolean
	links: string[]
	userId: string
	userBio: UserBio
	title: string
	description: string
	tags: string[]
	createdAt: number
	updatedAt: number
}