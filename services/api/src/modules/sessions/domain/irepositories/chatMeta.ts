import { QueryParams, QueryResults } from '@utils/commons'
import { ChatMetaEntity } from '../entities/chatMeta'
import { EmbeddedGroup, EmbeddedUser } from '../types'
import { ChatMetaToModel } from '../../data/models/chatMeta'
import { ChatFromModel } from '../../data/models/chat'

export interface IChatMetaRepository {
	add: (data: ChatMetaToModel) => Promise<ChatMetaEntity>
	find: (id: string, userId: string) => Promise<ChatMetaEntity | null>
	get: (query: QueryParams) => Promise<QueryResults<ChatMetaEntity>>
	updateUserBio: (user: EmbeddedUser) => Promise<boolean>
	updateClassGroup: (group: EmbeddedGroup) => Promise<boolean>
	updateClassGroupMembers: (groupId: string, members: string[]) => Promise<boolean>
	updateLastChat: (discussion: ChatFromModel) => Promise<void>
}