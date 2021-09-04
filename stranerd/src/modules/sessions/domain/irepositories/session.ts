import { SessionToModel } from '../../data/models/session'
import { SessionEntity } from '../entities/session'
import { QueryParams, QueryResults } from '@utils/commons'
import { CancelReason } from '../types/session'
import { UserBio } from '../types/common'

export interface ISessionRepository {
	add: (data: SessionToModel) => Promise<SessionEntity>,
	get: (query: QueryParams) => Promise<QueryResults<SessionEntity>>
	find: (id: string) => Promise<SessionEntity | null>
	accept: (id: string, tutorId: string, accepted: boolean) => Promise<boolean>
	cancel: (ids: string[], userId: string, reason: CancelReason) => Promise<boolean>
	updateMySessionsBio: (userId: string, userBio: UserBio) => Promise<boolean>
}
