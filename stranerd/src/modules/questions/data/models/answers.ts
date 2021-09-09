import { UserBio } from '../../domain/types/users'

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
	coins: number
	tags: string[]
	questionId: string
	userId: string
	userBio: UserBio
}
