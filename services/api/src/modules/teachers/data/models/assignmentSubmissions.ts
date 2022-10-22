import { EmbeddedUser, Media } from '../../domain/types'

export interface AssignmentSubmissionFromModel extends AssignmentSubmissionToModel {
	_id: string
	courseId: string
	members: string[]
	createdAt: number
	updatedAt: number
}

export interface AssignmentSubmissionToModel {
	assignmentId: string
	user: EmbeddedUser
	attachments: Media[]
}