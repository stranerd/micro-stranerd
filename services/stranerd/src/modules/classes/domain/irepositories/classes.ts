import { ClassEntity } from '../entities/classes'
import { ClassToModel } from '../../data/models/classes'
import { QueryParams, QueryResults } from '@utils/commons'
import { ClassUsers, UserBio, UserRoles } from '../types'

export interface IClassRepository {
	add: (data: ClassToModel) => Promise<ClassEntity>
	get: (condition: QueryParams) => Promise<QueryResults<ClassEntity>>
	find: (id: string) => Promise<ClassEntity | null>
	update: (id: string, userId: string, data: Partial<ClassToModel>) => Promise<ClassEntity | null>
	delete: (id: string, userId: string) => Promise<boolean>
	updateClassesUserBio: (userId: string, userBio: UserBio, userRoles: UserRoles) => Promise<boolean>
	requestClass: (classId: string, userId: string, request: boolean) => Promise<boolean>
	leaveClass: (classId: string, userId: string) => Promise<boolean>
	acceptRequest: (classId: string, adminId: string, requestId: string, accept: boolean) => Promise<boolean>
	addMembers: (classId: string, adminId: string, userIds: string[], add: boolean) => Promise<boolean>
	changeMemberRole: (classId: string, adminId: string, userId: string, role: ClassUsers, add: boolean) => Promise<boolean>
}