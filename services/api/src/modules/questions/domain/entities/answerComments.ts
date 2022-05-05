import { BaseEntity } from '@utils/commons'
import { EmbeddedUser } from '../types'

export class AnswerCommentEntity extends BaseEntity {
	public readonly id: string
	public readonly body: string
	public readonly answerId: string
	public readonly user: EmbeddedUser
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({ id, body, createdAt, user, answerId, updatedAt }: CommentConstructorArgs) {
		super()
		this.id = id
		this.body = body
		this.user = user
		this.answerId = answerId
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}
}

type CommentConstructorArgs = {
	id: string
	body: string
	user: EmbeddedUser
	answerId: string
	createdAt: number
	updatedAt: number
}
