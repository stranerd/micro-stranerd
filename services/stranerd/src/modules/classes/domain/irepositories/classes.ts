import { ClassEntity } from '../entities/classes'
import { ClassToModel } from '../../data/models/classes'
import { QueryParams, QueryResults } from '@utils/commons'
import { UserBio, UserRoles } from '../types'

export interface IClassRepository {
	add: (data: ClassToModel) => Promise<ClassEntity>
	get: (condition: QueryParams) => Promise<QueryResults<ClassEntity>>
	find: (id: string) => Promise<ClassEntity | null>
	update: (id: string, userId: string, data: Partial<ClassToModel>) => Promise<ClassEntity | null>
	delete: (id: string, userId: string) => Promise<boolean>
	updateClassesUserBio: (userId: string, userBio: UserBio, userRoles: UserRoles) => Promise<boolean>
}