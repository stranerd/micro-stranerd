import { UserBio } from '../../domain/types/users'

export interface AnswerCommentFromModel extends AnswerCommentToModel {
	_id: string
	createdAt: number
	updatedAt: number
}

export interface AnswerCommentToModel {
	body: string
	userId: string
	answerId: string
	userBio: UserBio
}
