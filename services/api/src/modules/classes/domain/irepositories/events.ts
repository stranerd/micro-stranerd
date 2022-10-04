import { EventEntity } from '../entities/events'
import { EventToModel } from '../../data/models/events'
import { QueryParams, QueryResults } from '@utils/app/package'
import { ClassUsers, EmbeddedUser, EventType } from '../types'

export interface IEventRepository {
	add: (data: EventToModel) => Promise<EventEntity>
	get: (condition: QueryParams) => Promise<QueryResults<EventEntity>>
	find: (id: string) => Promise<EventEntity | null>
	update: (classId: string, id: string, userId: string, data: Partial<EventToModel>) => Promise<EventEntity | null>
	delete: (classId: string, id: string, userId: string) => Promise<boolean>
	updateUserBio: (user: EmbeddedUser) => Promise<boolean>
	updateUsers: (classId: string, users: Record<ClassUsers, string[]>) => Promise<boolean>
	deleteClassEvents: (classId: string) => Promise<boolean>
	updateTaskIds: (id: string, data: { taskIds: string[], add: boolean }) => Promise<void>
	markRead: (classId: string, userId: string, type: EventType) => Promise<boolean>
}