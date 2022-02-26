import { GroupEntity } from '../entities/groups'
import { GroupToModel } from '../../data/models/groups'
import { QueryParams, QueryResults } from '@utils/commons'

export interface IGroupRepository {
	add: (data: GroupToModel) => Promise<GroupEntity>
	get: (condition: QueryParams) => Promise<QueryResults<GroupEntity>>
	find: (id: string) => Promise<GroupEntity | null>
	update: (id: string, userId: string, data: Partial<GroupToModel>) => Promise<GroupEntity | null>
	delete: (id: string, userId: string) => Promise<boolean>
	updateGroupsAdmins: (classId: string, admins: string[]) => Promise<boolean>
}