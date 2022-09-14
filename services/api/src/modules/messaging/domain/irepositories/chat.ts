import { QueryParams, QueryResults } from '@utils/app/package'
import { ChatToModel } from '../../data/models/chat'
import { ChatEntity } from '../entities/chat'
import { EmbeddedUser } from '../types'

export interface IChatRepository {
	add: (data: ChatToModel) => Promise<ChatEntity>,
	get: (query: QueryParams) => Promise<QueryResults<ChatEntity>>
	find: (id: string, userId: string) => Promise<ChatEntity | null>
	update: (id: string, userId: string, data: Partial<ChatToModel>) => Promise<ChatEntity | null>
	delete: (id: string, userId: string) => Promise<boolean>
	updateUserBio: (user: EmbeddedUser) => Promise<boolean>
	markRead: (from: string, to: string) => Promise<boolean>
	deleteClassGroupChats: (groupId: string) => Promise<boolean>
}
