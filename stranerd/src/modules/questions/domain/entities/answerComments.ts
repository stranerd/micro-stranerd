import { BaseEntity } from '@utils/commons'
import { UserBio } from '../types/users'

export class AnswerCommentEntity extends BaseEntity {
	public readonly id: string
	public readonly body: string
	public readonly answerId: string
	public readonly userId: string
	public readonly userBio: UserBio
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({ id, body, createdAt, userId, userBio, answerId, updatedAt }: CommentConstructorArgs) {
		super()
		this.id = id
		this.body = body
		this.userId = userId
		this.answerId = answerId
		this.userBio = userBio
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}
}

type CommentConstructorArgs = {
	id: string
	body: string
	userId: string
	answerId: string
	userBio: UserBio
	createdAt: number
	updatedAt: number
}