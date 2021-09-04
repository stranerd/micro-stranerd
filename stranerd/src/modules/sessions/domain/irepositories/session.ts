import { SessionToModel } from '../../data/models/session'
import { SessionEntity } from '../entities/session'
import { QueryParams, QueryResults } from '@utils/commons'
import { CancelReason } from '../types/session'

export interface ISessionRepository {
	add: (data: Partial<SessionToModel>) => Promise<SessionEntity>,
	get: (query: QueryParams) => Promise<QueryResults<SessionEntity>>
	find: (id: string) => Promise<SessionEntity | null>
	accept: (id: string, accepted: boolean) => Promise<boolean>
	cancel: (id: string, reason: CancelReason) => Promise<boolean>
}
