import { UserBio } from '../../domain/types/users'

export interface QuestionFromModel extends QuestionToModel {
	_id: string
	bestAnswers: [string]
	answersCount: number
	commentsCount: number
	createdAt: number
	updatedAt: number
}

export interface QuestionToModel {
	body: string
	coins: number
	tags: string[]
	subjectId: string
	userId: string
	userBio: UserBio
}
