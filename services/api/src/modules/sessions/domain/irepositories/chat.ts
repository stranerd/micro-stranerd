import { QueryParams, QueryResults } from '@utils/commons'
import { ChatToModel } from '../../data/models/chat'
import { ChatEntity } from '../entities/chat'

export interface IChatRepository {
	add: (data: ChatToModel) => Promise<ChatEntity>,
	get: (query: QueryParams) => Promise<QueryResults<ChatEntity>>
	find: (id: string, userId: string) => Promise<ChatEntity | null>
	markRead: (id: string, from: string, to: string) => Promise<boolean>
	delete: (id: string, userId: string) => Promise<boolean>
	deleteSessionChats: (sessionId: string) => Promise<boolean>
}
