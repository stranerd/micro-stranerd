import { BaseEntity } from '@utils/commons'
import { UserBio, UserRoles } from '../types'

export class AnswerCommentEntity extends BaseEntity {
	public readonly id: string
	public readonly body: string
	public readonly answerId: string
	public readonly userId: string
	public readonly userBio: UserBio
	public readonly userRoles: UserRoles
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({ id, body, createdAt, userId, userBio, userRoles, answerId, updatedAt }: CommentConstructorArgs) {
		super()
		this.id = id
		this.body = body
		this.userId = userId
		this.answerId = answerId
		this.userBio = userBio
		this.userRoles = userRoles
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
	userRoles: UserRoles
	createdAt: number
	updatedAt: number
}