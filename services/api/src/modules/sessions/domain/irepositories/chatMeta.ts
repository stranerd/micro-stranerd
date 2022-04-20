import { QueryParams, QueryResults } from '@utils/commons'
import { ChatMetaEntity } from '../entities/chatMeta'
import { UserBio, UserRoles } from '../types'

export interface IChatMetaRepository {
	find: (id: string, userId: string) => Promise<ChatMetaEntity | null>
	get: (query: QueryParams) => Promise<QueryResults<ChatMetaEntity>>
	updateBio: (id: string, userBio: UserBio, userRoles: UserRoles) => Promise<boolean>
	updateUserBios: (userId: string, userBio: UserBio, userRoles: UserRoles) => Promise<boolean>
}