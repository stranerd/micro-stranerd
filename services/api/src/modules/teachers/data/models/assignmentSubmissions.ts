import { EmbeddedUser, Media } from '../../domain/types'

export interface AssignmentSubmissionFromModel extends AssignmentSubmissionToModel {
	_id: string
	createdAt: number
	updatedAt: number
}

export interface AssignmentSubmissionToModel {
	courseId: string
	assignmentId: string
	members: string[]
	user: EmbeddedUser
	attachments: Media[]
}