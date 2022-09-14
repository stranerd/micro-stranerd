import { ClassEntity } from '../entities/classes'
import { ClassToModel } from '../../data/models/classes'
import { QueryParams, QueryResults } from '@utils/app/package'
import { ClassUsers, EmbeddedUser } from '../types'

export interface IClassRepository {
	add: (data: ClassToModel) => Promise<ClassEntity>
	get: (condition: QueryParams) => Promise<QueryResults<ClassEntity>>
	find: (id: string) => Promise<ClassEntity | null>
	update: (id: string, userId: string, data: Partial<ClassToModel>) => Promise<ClassEntity | null>
	delete: (id: string, userId: string) => Promise<boolean>
	updateUserBio: (user: EmbeddedUser) => Promise<boolean>
	requestClass: (classId: string, userId: string, request: boolean) => Promise<boolean>
	leaveClass: (classId: string, userId: string) => Promise<boolean>
	acceptRequest: (classId: string, adminId: string, requestId: string, accept: boolean) => Promise<boolean>
	addMembers: (classId: string, adminId: string, userIds: string[], add: boolean) => Promise<boolean>
	changeMemberRole: (classId: string, adminId: string, userId: string, role: ClassUsers, add: boolean) => Promise<boolean>
}