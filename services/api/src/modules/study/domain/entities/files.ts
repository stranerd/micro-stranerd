import { BaseEntity } from '@utils/app/package'
import { EmbeddedUser, Media } from '../types'

export class FileEntity extends BaseEntity {
	public readonly id: string
	public readonly title: string
	public readonly media: Media
	public readonly user: EmbeddedUser
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id,
		             title,
		             user,
		             media,
		             createdAt,
		             updatedAt
	             }: FileConstructorArgs) {
		super()
		this.id = id
		this.title = title
		this.media = media
		this.user = user
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}
}

type FileConstructorArgs = {
	id: string,
	user: EmbeddedUser
	title: string
	media: Media
	createdAt: number
	updatedAt: number
}
