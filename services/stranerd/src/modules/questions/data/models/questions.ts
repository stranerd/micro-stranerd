import { Media, QuestionData, UserBio, UserRoles } from '../../domain/types'

export interface QuestionFromModel extends QuestionToModel {
	_id: string
	bestAnswers: string[]
	answers: { id: string, userId: string }[]
	createdAt: number
	updatedAt: number
}

export interface QuestionToModel {
	body: string
	attachments: Media[]
	subject: string
	userId: string
	userBio: UserBio
	userRoles: UserRoles
	data: QuestionData
}
