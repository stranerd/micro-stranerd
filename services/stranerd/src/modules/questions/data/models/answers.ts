import { Media, UserBio, UserRoles } from '../../domain/types'

export interface AnswerFromModel extends AnswerToModel {
	_id: string
	best: boolean
	votes: { userId: string, vote: 1 | -1 }[]
	commentsCount: number
	createdAt: number
	updatedAt: number
}

export interface AnswerToModel {
	title: string
	body: string
	attachments: Media[]
	questionId: string
	userId: string
	userBio: UserBio
	userRoles: UserRoles
}
