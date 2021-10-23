import { BaseEntity, MediaOutput } from '@utils/commons'
import { UserBio } from '../types'

export class NoteEntity extends BaseEntity {
	public readonly id: string
	public readonly title: string
	public readonly tags: string[]
	public readonly institutionId: string
	public readonly courseId: string
	public readonly userId: string
	public readonly userBio: UserBio
	public readonly isHosted: boolean
	public readonly link: string | null
	public readonly media: MediaOutput | null
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id,
		             title,
		             tags,
		             institutionId,
		             courseId,
		             userId,
		             userBio,
		             isHosted,
		             link,
		             media,
		             createdAt,
		             updatedAt
	             }: NoteConstructorArgs) {
		super()
		this.id = id
		this.title = title
		this.tags = tags
		this.institutionId = institutionId
		this.courseId = courseId
		this.userId = userId
		this.userBio = userBio
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
	media: MediaOutput | null
	userId: string
	userBio: UserBio
	title: string
	tags: string[]
	institutionId: string
	courseId: string
	createdAt: number
	updatedAt: number
}