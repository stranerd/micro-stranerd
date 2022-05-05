import { EmbeddedUser } from '../../domain/types'

export interface AnswerCommentFromModel extends AnswerCommentToModel {
	_id: string
	createdAt: number
	updatedAt: number
}

export interface AnswerCommentToModel {
	body: string
	answerId: string
	user: EmbeddedUser
}
