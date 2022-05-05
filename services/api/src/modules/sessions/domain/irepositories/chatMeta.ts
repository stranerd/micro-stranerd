import { QueryParams, QueryResults } from '@utils/commons'
import { ChatMetaEntity } from '../entities/chatMeta'
import { EmbeddedUser } from '../types'

export interface IChatMetaRepository {
	find: (id: string, userId: string) => Promise<ChatMetaEntity | null>
	get: (query: QueryParams) => Promise<QueryResults<ChatMetaEntity>>
	updateBio: (id: string, user: EmbeddedUser) => Promise<boolean>
	updateUserBio: (user: EmbeddedUser) => Promise<boolean>
}