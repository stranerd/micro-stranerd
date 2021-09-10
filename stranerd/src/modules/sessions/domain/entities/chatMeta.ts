import { BaseEntity } from '@utils/commons'
import { ChatEntity } from './chat'
import { UserBio } from '../types'

export class ChatMetaEntity extends BaseEntity {
	public readonly id: string
	public readonly unRead: string[]
	public readonly ownerId: string
	public readonly userId: string
	public readonly userBio: UserBio
	public readonly last: ChatEntity
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id, unRead, userId, ownerId, userBio, last, createdAt, updatedAt
	             }: ChatMetaConstructorArgs) {
		super()
		this.id = id
		this.unRead = unRead
		this.ownerId = ownerId
		this.userId = userId
		this.userBio = userBio
		this.last = last
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}
}

type ChatMetaConstructorArgs = {
	id: string,
	unRead: string[],
	ownerId: string,
	userId: string,
	userBio: UserBio,
	last: ChatEntity,
	createdAt: number,
	updatedAt: number
}
