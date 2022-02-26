import { DiscussionEntity } from '../entities/discussions'
import { DiscussionToModel } from '../../data/models/discussions'
import { QueryParams, QueryResults } from '@utils/commons'
import { UserBio, UserRoles } from '../types'

export interface IDiscussionRepository {
	add: (data: DiscussionToModel) => Promise<DiscussionEntity>
	get: (condition: QueryParams) => Promise<QueryResults<DiscussionEntity>>
	find: (id: string) => Promise<DiscussionEntity | null>
	update: (id: string, userId: string, data: Partial<DiscussionToModel>) => Promise<DiscussionEntity | null>
	delete: (id: string, userId: string) => Promise<boolean>
	updateDiscussionsUserBio: (userId: string, userBio: UserBio, userRoles: UserRoles) => Promise<boolean>
}