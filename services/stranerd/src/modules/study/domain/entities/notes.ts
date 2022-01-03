import { BaseEntity, MediaOutput } from '@utils/commons'
import { UserBio } from '../types'

export class NoteEntity extends BaseEntity {
	public readonly id: string
	public readonly title: string
	public readonly description: string
	public readonly tags: string[]
	public readonly userId: string
	public readonly userBio: UserBio
	public readonly isHosted: boolean
	public readonly link: string | null
	public readonly media: MediaOutput | null
	public readonly preview: MediaOutput
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id,
		             title,
		             description,
		             tags,
		             userId,
		             userBio,
		             isHosted,
		             link,
		             media,
		             preview,
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
		this.isHosted = isHosted
		this.link = link
		this.media = media
		this.preview = preview
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}
}

type NoteConstructorArgs = {
	id: string,
	isHosted: boolean
	link: string | null
	media: MediaOutput | null
	preview: MediaOutput
	userId: string
	userBio: UserBio
	title: string
	description: string
	tags: string[]
	createdAt: number
	updatedAt: number
}