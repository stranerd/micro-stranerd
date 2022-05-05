import { BaseEntity } from '@utils/commons'
import { EmbeddedUser, Media } from '../types'

export class NoteEntity extends BaseEntity {
	public readonly id: string
	public readonly title: string
	public readonly description: string
	public readonly user: EmbeddedUser
	public readonly isHosted: boolean
	public readonly link: string | null
	public readonly media: Media | null
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id,
		             title,
		             description,
		             user,
		             isHosted,
		             link,
		             media,
		             createdAt,
		             updatedAt
	             }: NoteConstructorArgs) {
		super()
		this.id = id
		this.title = title
		this.description = description
		this.user = user
		this.isHosted = isHosted
		this.link = link
		this.media = media
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}
}

type NoteConstructorArgs = {
	id: string,
	isHosted: boolean
	link: string | null
	media: Media | null
	user: EmbeddedUser
	title: string
	description: string
	createdAt: number
	updatedAt: number
}