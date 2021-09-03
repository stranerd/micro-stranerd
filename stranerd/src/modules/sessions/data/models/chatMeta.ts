import { UserBio } from '@modules/users/domain/types/users'
import { ChatFromModel } from './chat'

export interface ChatMetaFromModel {
	_id: string
	unRead: string[],
	last: ChatFromModel,
	userBio: UserBio
}

export interface ChatMetaToModel {
	unRead: string[],
	last: ChatFromModel,
	userBio: UserBio
}



