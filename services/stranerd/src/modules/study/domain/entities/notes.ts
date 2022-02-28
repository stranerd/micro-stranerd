import { BaseEntity } from '@utils/commons'
import { Media, UserBio, UserRoles } from '../types'

export class NoteEntity extends BaseEntity {
	public readonly id: string
	public readonly title: string
	public readonly description: string
	public readonly tags: string[]
	public readonly userId: string
	public readonly userBio: UserBio
	public readonly userRoles: UserRoles
	public readonly isHosted: boolean
	public readonly isPublic: boolean
	public readonly link: string | null
	public readonly media: Media | null
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id,
		             title,
		             description,
		             tags,
		             userId,
		             userBio,
		             userRoles,
		             isHosted,
		             isPublic,
		             link,
		             media,
		             createdAt,
		             updatedAt
	             }: NoteConstructorArgs) {
		super()
		this.id = id
		this.title = title
		this.description = description
		this.tags = tags
		this.userId = userId
		this.userBio = userBio
		this.userRoles = userRoles
		this.isPublic = isPublic
		this.isHosted = isHosted
		this.link = link
		this.media = media
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}
}

type NoteConstructorArgs = {
	id: string,
	isPublic: boolean
	isHosted: boolean
	link: string | null
	media: Media | null
	userId: string
	userBio: UserBio
	userRoles: UserRoles
	title: string
	description: string
	tags: string[]
	createdAt: number
	updatedAt: number
}