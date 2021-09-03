import { BaseEntity } from '@utils/commons'
import { ChatEntity } from './chat'
import { UserBio } from '@modules/users/domain/types/users'

export class ChatMetaEntity extends BaseEntity {
	public readonly id: string
	public readonly unRead: string[]
	public readonly userBio: UserBio
	public readonly last: ChatEntity

	constructor ({
		      id, unRead, userBio, last
	             }: ChatMetaConstructorArgs) {
		super()
		this.id = id
		this.unRead = Object.keys(unRead ?? {})
		this.userBio = userBio
		this.last = last
	}
}

type ChatMetaConstructorArgs = {
	id: string,
	unRead: string[],
	userBio: UserBio,
	last: ChatEntity
}
