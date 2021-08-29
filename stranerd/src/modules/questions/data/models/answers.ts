import { UserBio } from '../../domain/types/users'

export interface AnswerFromModel extends AnswerToModel {
	_id: string
	best: boolean
	ratings: { total: number, count: number }
	commentsCount: number
	createdAt: number
	updatedAt: number
}

export interface AnswerToModel {
	title: string
	body: string
	coins: number
	questionId: string
	userId: string
	userBio: UserBio
}
