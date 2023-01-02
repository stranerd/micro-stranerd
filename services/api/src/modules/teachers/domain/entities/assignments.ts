import { BaseEntity } from '@utils/app/package'
import { EmbeddedUser, Media } from '../types'
import { generateDefaultUser } from '@modules/users'

export class AssignmentEntity extends BaseEntity {
	public readonly id: string
	public readonly courseId: string
	public readonly title: string
	public readonly description: string
	public readonly user: EmbeddedUser
	public readonly attachments: Media[]
	public readonly submissions: { userId: string, id: string }[]
	public readonly members: string[]
	public readonly deadline: number | null
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id,
		             courseId,
		             members,
		             title,
		             description,
		             user,
		             attachments,
		             submissions,
		             deadline,
		             createdAt,
		             updatedAt
	             }: AssignmentConstructorArgs) {
		super()
		this.id = id
		this.courseId = courseId
		this.members = members
		this.title = title
		this.description = description
		this.user = generateDefaultUser(user)
		this.attachments = attachments
		this.submissions = submissions
		this.deadline = deadline
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}
}

type AssignmentConstructorArgs = {
	id: string
	courseId: string
	members: string[]
	title: string
	description: string
	user: EmbeddedUser
	attachments: Media[]
	deadline: number | null
	submissions: { userId: string, id: string }[]
	createdAt: number
	updatedAt: number
}
