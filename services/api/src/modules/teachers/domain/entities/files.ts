import { BaseEntity } from '@utils/app/package'
import { EmbeddedUser, Media } from '../types'

export class FileEntity extends BaseEntity {
	public readonly id: string
	public readonly courseId: string
	public readonly title: string
	public readonly media: Media
	public readonly user: EmbeddedUser
	public readonly members: string[]
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id, courseId, title, media, user, members, createdAt, updatedAt
	             }: FileConstructorArgs) {
		super()
		this.id = id
		this.courseId = courseId
		this.title = title
		this.media = media
		this.user = user
		this.members = members
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}
}

type FileConstructorArgs = {
	id: string
	courseId: string
	title: string
	media: Media
	user: EmbeddedUser
	members: string[]
	createdAt: number
	updatedAt: number
}
