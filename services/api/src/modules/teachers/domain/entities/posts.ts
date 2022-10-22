import { BaseEntity } from '@utils/app/package'
import { EmbeddedUser, Media, PostData, PostMetaType } from '../types'

export class PostEntity extends BaseEntity {
	public readonly id: string
	public readonly courseId: string
	public readonly title: string
	public readonly description: string
	public readonly data: PostData
	public readonly user: EmbeddedUser
	public readonly attachments: Media[]
	public readonly members: string[]
	public readonly meta: PostMetaType
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id,
		             courseId,
		             members,
		             title,
		             description,
		             data,
		             user,
		             attachments,
		             meta,
		             createdAt,
		             updatedAt
	             }: PostConstructorArgs) {
		super()
		this.id = id
		this.courseId = courseId
		this.members = members
		this.title = title
		this.description = description
		this.data = data
		this.user = user
		this.attachments = attachments
		this.meta = meta
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}
}

type PostConstructorArgs = {
	id: string
	courseId: string
	members: string[]
	title: string
	description: string
	data: PostData
	user: EmbeddedUser
	attachments: Media[]
	meta: PostMetaType
	createdAt: number
	updatedAt: number
}
