import { QueryParams, QueryResults } from '@utils/commons'
import { ChatMetaEntity } from '../entities/chatMeta'
import { UserBio } from '../types'

export interface IChatMetaRepository {
	find: (id: string, userId: string) => Promise<ChatMetaEntity | null>
	get: (query: QueryParams) => Promise<QueryResults<ChatMetaEntity>>
	updateBio: (id: string, bio: UserBio) => Promise<boolean>
	updateUserBios: (userId: string, bio: UserBio) => Promise<boolean>
}