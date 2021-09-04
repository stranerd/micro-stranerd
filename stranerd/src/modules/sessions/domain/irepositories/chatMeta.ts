import { QueryParams, QueryResults } from '@utils/commons'
import { ChatMetaEntity } from '../entities/chatMeta'

export interface IChatMetaRepository {
	get: (query: QueryParams) => Promise<QueryResults<ChatMetaEntity>>
}
