import { EmbeddedUser } from '../../domain/types'
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
	user: EmbeddedUser
}