import { BaseEntity } from '@utils/commons'
import { CommentData, UserBio, UserRoles } from '../types'

export class CommentEntity extends BaseEntity {
	public readonly id: string
	public readonly body: string
	public readonly data: CommentData
	public readonly userId: string
	public readonly userBio: UserBio
	public readonly userRoles: UserRoles
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id,
		             body,
		             data,
		             userId,
		             userBio,
		             userRoles,
		             createdAt,
		             updatedAt
	             }: CommentConstructorArgs) {
		super()
		this.id = id
		this.body = body
		this.data = data
		this.userId = userId
		this.userBio = userBio
		this.userRoles = userRoles
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}
}

type CommentConstructorArgs = {
	id: string
	body: string
	data: CommentData
	userId: string
	userBio: UserBio
	userRoles: UserRoles
	createdAt: number
	updatedAt: number
}
