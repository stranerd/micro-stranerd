import { GroupEntity } from '../entities/groups'
import { GroupToModel } from '../../data/models/groups'
import { QueryParams, QueryResults } from '@utils/commons'
import { ClassUsers, UserBio, UserRoles } from '../types'

export interface IGroupRepository {
	add: (data: GroupToModel) => Promise<GroupEntity>
	get: (condition: QueryParams) => Promise<QueryResults<GroupEntity>>
	find: (id: string) => Promise<GroupEntity | null>
	update: (id: string, userId: string, data: Partial<GroupToModel>) => Promise<GroupEntity | null>
	delete: (id: string, userId: string) => Promise<boolean>
	updateGroupsUserBio: (userId: string, userBio: UserBio, userRoles: UserRoles) => Promise<boolean>
	updateGroupsUsers: (classId: string, users: Record<ClassUsers, string[]>) => Promise<boolean>
}