import { EventEntity } from '../entities/events'
import { EventToModel } from '../../data/models/events'
import { QueryParams, QueryResults } from '@utils/commons'
import { ClassUsers, EmbeddedUser, TaskID } from '../types'

export interface IEventRepository {
	add: (data: EventToModel) => Promise<EventEntity>
	get: (condition: QueryParams) => Promise<QueryResults<EventEntity>>
	find: (classId: string, id: string, userId: string) => Promise<EventEntity | null>
	update: (classId: string, id: string, userId: string, data: Partial<EventToModel>) => Promise<EventEntity | null>
	delete: (classId: string, id: string, userId: string) => Promise<boolean>
	updateUserBio: (user: EmbeddedUser) => Promise<boolean>
	updateUsers: (classId: string, users: Record<ClassUsers, string[]>) => Promise<boolean>
	deleteClassEvents: (classId: string) => Promise<boolean>
	updateTaskIds: (id: string, data: { taskIds: TaskID[], add: boolean }) => Promise<void>
}