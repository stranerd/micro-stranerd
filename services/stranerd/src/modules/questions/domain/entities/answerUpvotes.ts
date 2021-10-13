import { BaseEntity } from '@utils/commons'

export class AnswerUpvoteEntity extends BaseEntity {
	public readonly id: string
	public readonly vote: 1 | -1
	public readonly answerId: string
	public readonly userId: string
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({ id, vote, createdAt, userId, answerId, updatedAt }: UpvoteConstructorArgs) {
		super()
		this.id = id
		this.vote = vote
		this.userId = userId
		this.answerId = answerId
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}
}

type UpvoteConstructorArgs = {
	id: string
	vote: 1 | -1
	userId: string
	answerId: string
	createdAt: number
	updatedAt: number
}
