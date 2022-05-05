import { DiscussionEntity } from '../entities/discussions'
import { DiscussionToModel } from '../../data/models/discussions'
import { QueryParams, QueryResults } from '@utils/commons'
import { EmbeddedUser } from '../types'

export interface IDiscussionRepository {
	add: (data: DiscussionToModel) => Promise<DiscussionEntity>
	get: (condition: QueryParams) => Promise<QueryResults<DiscussionEntity>>
	find: (classId: string, id: string) => Promise<DiscussionEntity | null>
	update: (classId: string, id: string, userId: string, data: Partial<DiscussionToModel>) => Promise<DiscussionEntity | null>
	delete: (classId: string, id: string, userId: string) => Promise<boolean>
	updateUserBio: (user: EmbeddedUser) => Promise<boolean>
	deleteGroupDiscussions: (groupId: string) => Promise<boolean>
}