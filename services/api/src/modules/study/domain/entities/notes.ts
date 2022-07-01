import { BaseEntity } from '@utils/commons'
import { EmbeddedUser } from '../types'

export class NoteEntity extends BaseEntity {
	public readonly id: string
	public readonly title: string
	public readonly content: string
	public readonly user: EmbeddedUser
	public readonly isPrivate: boolean
	public readonly links: { original: string, normalized: string }[]
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id,
		             title,
		             content,
		             user,
		             isPrivate,
		             links,
		             createdAt,
		             updatedAt
	             }: NoteConstructorArgs) {
		super()
		this.id = id
		this.title = title
		this.content = content
		this.user = user
		this.isPrivate = isPrivate
		this.links = links
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}
}

type NoteConstructorArgs = {
	id: string,
	isPrivate: boolean
	user: EmbeddedUser
	title: string
	content: string
	links: { original: string, normalized: string }[]
	createdAt: number
	updatedAt: number
}