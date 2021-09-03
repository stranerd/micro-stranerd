import { QueryParams, QueryResults } from '@utils/commons'
import { ChatToModel } from '../../data/models/chat'
import { ChatEntity } from '../entities/chat'

export interface IChatRepository {
	add: (data: ChatToModel) => Promise<ChatEntity>,
	get: (query: QueryParams) => Promise<QueryResults<ChatEntity>>
	find: (id: string) => Promise<ChatEntity | null>
	markRead: (id: string,data: Partial<ChatToModel>) => Promise<boolean>
	delete: (id: string) => Promise<boolean>
}
