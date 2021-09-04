import { QueryParams, QueryResults } from '@utils/commons'
import { ChatToModel } from '../../data/models/chat'
import { ChatEntity } from '../entities/chat'

export interface IChatRepository {
	add: (data: ChatToModel, path: [string, string]) => Promise<ChatEntity>,
	get: (query: QueryParams) => Promise<QueryResults<ChatEntity>>
	find: (id: string) => Promise<ChatEntity | null>
	markRead: (id: string, path: [string, string]) => Promise<boolean>
	delete: (id: string, userId: string) => Promise<boolean>
}
