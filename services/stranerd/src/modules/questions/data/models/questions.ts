import { Media, QuestionData, UserBio, UserRoles } from '../../domain/types'

export interface QuestionFromModel extends QuestionToModel {
	_id: string
	bestAnswers: string[]
	answers: { id: string, userId: string }[]
	commentsCount: number
	createdAt: number
	updatedAt: number
}

export interface QuestionToModel {
	body: string
	tags: string[]
	attachments: Media[]
	subjectId: string
	userId: string
	userBio: UserBio
	userRoles: UserRoles
	data: QuestionData
}
