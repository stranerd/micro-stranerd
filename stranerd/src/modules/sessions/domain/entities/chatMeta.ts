import { BaseEntity } from '@utils/commons'
import { ChatEntity } from './chat'
import { UserBio } from '../types/common'

export class ChatMetaEntity extends BaseEntity {
	public readonly id: string
	public readonly unRead: string[]
	public readonly userBio: UserBio
	public readonly last: ChatEntity
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id, unRead, userBio, last, createdAt, updatedAt
	             }: ChatMetaConstructorArgs) {
		super()
		this.id = id
		this.unRead = Object.keys(unRead ?? {})
		this.userBio = userBio
		this.last = last
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}
}

type ChatMetaConstructorArgs = {
	id: string,
	unRead: string[],
	userBio: UserBio,
	last: ChatEntity,
	createdAt: number,
	updatedAt: number
}
