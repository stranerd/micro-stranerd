import { BaseEntity } from '@utils/app/package'
import { EmbeddedUser, Media } from '../types'
import { generateDefaultUser } from '@modules/users'

export class AssignmentSubmissionEntity extends BaseEntity {
	public readonly id: string
	public readonly courseId: string
	public readonly assignmentId: string
	public readonly user: EmbeddedUser
	public readonly attachments: Media[]
	public readonly members: string[]
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id, courseId, assignmentId, members, user, attachments, createdAt, updatedAt
	             }: AssignmentSubmissionConstructorArgs) {
		super()
		this.id = id
		this.courseId = courseId
		this.assignmentId = assignmentId
		this.members = members
		this.user = generateDefaultUser(user)
		this.attachments = attachments
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}
}

type AssignmentSubmissionConstructorArgs = {
	id: string
	courseId: string
	assignmentId: string
	members: string[]
	user: EmbeddedUser
	attachments: Media[]
	createdAt: number
	updatedAt: number
}
