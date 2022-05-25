import { BaseEntity } from '@utils/commons'
import { EmbeddedUser, Media } from '../types'

export class FileEntity extends BaseEntity {
	public readonly id: string
	public readonly title: string
	public readonly content: string
	public readonly user: EmbeddedUser
	public readonly isPrivate: boolean
	public readonly links: { original: string, normalized: string }[]
	public readonly media: Media | null
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id,
		             title,
		             content,
		             user,
		             isPrivate,
		             links,
		             media,
		             createdAt,
		             updatedAt
	             }: FileConstructorArgs) {
		super()
		this.id = id
		this.title = title
		this.content = content
		this.user = user
		this.isPrivate = isPrivate
		this.links = links
		this.media = media
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}
}

type FileConstructorArgs = {
	id: string,
	isPrivate: boolean
	user: EmbeddedUser
	media: Media | null
	title: string
	content: string
	links: { original: string, normalized: string }[]
	createdAt: number
	updatedAt: number
}