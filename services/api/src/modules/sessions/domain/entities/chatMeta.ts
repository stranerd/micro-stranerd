import { BaseEntity } from '@utils/commons'
import { ChatEntity } from './chat'
import { EmbeddedUser } from '../types'

export class ChatMetaEntity extends BaseEntity {
	public readonly id: string
	public readonly unRead: string[]
	public readonly ownerId: string
	public readonly user: EmbeddedUser
	public readonly last: ChatEntity
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id, unRead, user, ownerId, last, createdAt, updatedAt
	             }: ChatMetaConstructorArgs) {
		super()
		this.id = id
		this.unRead = unRead
		this.ownerId = ownerId
		this.user = user
		this.last = last
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}
}

type ChatMetaConstructorArgs = {
	id: string,
	unRead: string[],
	ownerId: string,
	user: EmbeddedUser
	last: ChatEntity,
	createdAt: number,
	updatedAt: number
}
