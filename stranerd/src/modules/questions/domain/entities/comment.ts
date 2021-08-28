import { UserBio } from '../../../users/domain/types/users'
import { generateDefaultBio } from '../../../users/domain/entities/users'
import { BaseEntity } from '@stranerd/api-commons'

export class CommentEntity extends BaseEntity {
	public readonly id: string
	public readonly body: string
	public readonly baseId: string
	public readonly userId: string
	public readonly user: UserBio
	public readonly createdAt: number

	constructor ({ id, body, createdAt, userId, user, baseId }: CommentConstructorArgs) {
		super()
		this.id = id
		this.body = body
		this.userId = userId
		this.baseId = baseId
		this.user = generateDefaultBio(user)
		this.createdAt = createdAt
	}

	get userName () {
		return this.user.firstName + this.user.lastName
	}

	get avatar () {
		return this.user.photo
	}
}

type CommentConstructorArgs = {
	id: string
	body: string
	userId: string
	baseId: string
	user: UserBio
	createdAt: number
}
