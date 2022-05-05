import { EventEntity } from '../entities/events'
import { EventToModel } from '../../data/models/events'
import { QueryParams, QueryResults } from '@utils/commons'
import { ClassUsers, UserBio, UserRoles } from '../types'

export interface IEventRepository {
	add: (data: EventToModel) => Promise<EventEntity>
	get: (condition: QueryParams) => Promise<QueryResults<EventEntity>>
	find: (classId: string, id: string) => Promise<EventEntity | null>
	update: (classId: string, id: string, userId: string, data: Partial<EventToModel>) => Promise<EventEntity | null>
	delete: (classId: string, id: string, userId: string) => Promise<boolean>
	updateEventsUserBio: (userId: string, userBio: UserBio, userRoles: UserRoles) => Promise<boolean>
	updateEventsUsers: (classId: string, users: Record<ClassUsers, string[]>) => Promise<boolean>
	deleteClassEvents: (classId: string) => Promise<boolean>
}