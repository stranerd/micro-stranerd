import { EmbeddedUser, Media } from '../../domain/types'

export interface AssignmentFromModel extends AssignmentToModel {
	_id: string
	submissions: { userId: string, id: string }[]
	createdAt: number
	updatedAt: number
}

export interface AssignmentToModel {
	courseId: string
	members: string[]
	title: string
	description: string
	user: EmbeddedUser
	attachments: Media[]
	deadline: number | null
}