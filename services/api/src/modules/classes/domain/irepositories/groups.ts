import { GroupEntity } from '../entities/groups'
import { GroupToModel } from '../../data/models/groups'
import { QueryParams, QueryResults } from '@utils/commons'
import { ClassUsers, EmbeddedUser } from '../types'

export interface IGroupRepository {
	add: (data: GroupToModel) => Promise<GroupEntity>
	get: (condition: QueryParams) => Promise<QueryResults<GroupEntity>>
	find: (classId: string, id: string) => Promise<GroupEntity | null>
	update: (classId: string, id: string, userId: string, data: Partial<GroupToModel>) => Promise<GroupEntity | null>
	delete: (classId: string, id: string, userId: string) => Promise<boolean>
	updateUserBio: (user: EmbeddedUser) => Promise<boolean>
	updateUsers: (classId: string, users: Record<ClassUsers, string[]>) => Promise<boolean>
	deleteClassGroups: (classId: string) => Promise<boolean>
}