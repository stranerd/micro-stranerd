import { SessionFromModel, SessionToModel } from '../../data/models/session'
import { SessionEntity } from '../entities/session'
import { QueryParams, QueryResults } from '@utils/commons'
import { EmbeddedUser, TaskID } from '../types'

export interface ISessionRepository {
	add: (data: SessionToModel) => Promise<SessionEntity>,
	get: (query: QueryParams) => Promise<QueryResults<SessionEntity>>
	find: (id: string, userId: string) => Promise<SessionEntity | null>
	accept: (id: string, tutorId: string, accepted: boolean) => Promise<boolean>
	cancel: (ids: string[], userId: string, reason: keyof SessionFromModel['cancelled']) => Promise<boolean>
	end: (ids: string[], userId: string) => Promise<boolean>
	updateUserBio: (user: EmbeddedUser) => Promise<boolean>
	updateTaskIdsAndTimes: (id: string, data: { taskIds: TaskID[], startedAt?: number, delayInMs?: number }) => Promise<void>
	markDone: (id: string) => Promise<void>
}
