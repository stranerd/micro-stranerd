import { UserBio } from '@modules/users/domain/types/users'
import { ChatFromModel } from './chat'

export interface ChatMetaFromModel extends ChatMetaToModel {
	_id: string
	createdAt: number
	updatedAt: number
}

export interface ChatMetaToModel {
	unRead: string[],
	last: ChatFromModel,
	ownerId: string,
	userId: string,
	userBio: UserBio
}



