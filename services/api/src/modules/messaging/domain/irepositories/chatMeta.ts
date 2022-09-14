import { QueryParams, QueryResults } from '@utils/app/package'
import { ChatMetaEntity } from '../entities/chatMeta'
import { EmbeddedGroup, EmbeddedUser } from '../types'
import { ChatMetaToModel } from '../../data/models/chatMeta'
import { ChatFromModel } from '../../data/models/chat'

export interface IChatMetaRepository {
	add: (data: ChatMetaToModel) => Promise<ChatMetaEntity>
	find: (id: string, userId: string) => Promise<ChatMetaEntity | null>
	get: (query: QueryParams) => Promise<QueryResults<ChatMetaEntity>>
	updateUserBio: (user: EmbeddedUser) => Promise<boolean>
	updateClassGroup: (group: EmbeddedGroup, members: string[]) => Promise<boolean>
	updateLastChat: (chat: ChatFromModel) => Promise<void>
	deleteGroupMeta: (groupId: string) => Promise<boolean>
}