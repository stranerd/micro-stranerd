export interface AnswerUpvoteFromModel extends AnswerUpvoteToModel {
	_id: string
	createdAt: number
	updatedAt: number
}

export interface AnswerUpvoteToModel {
	vote: 1 | -1
	userId: string
	answerId: string
}
