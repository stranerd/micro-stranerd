import { SchemeEntity } from '../entities/schemes'
import { SchemeToModel } from '../../data/models/schemes'
import { QueryParams, QueryResults } from '@utils/app/package'
import { ClassUsers, EmbeddedUser } from '../types'

export interface ISchemeRepository {
	add: (data: SchemeToModel) => Promise<SchemeEntity>
	get: (condition: QueryParams) => Promise<QueryResults<SchemeEntity>>
	find: (id: string) => Promise<SchemeEntity | null>
	update: (classId: string, id: string, userId: string, data: Partial<SchemeToModel>) => Promise<SchemeEntity | null>
	delete: (classId: string, id: string, userId: string) => Promise<boolean>
	updateUserBio: (user: EmbeddedUser) => Promise<boolean>
	updateUsers: (classId: string, users: Record<ClassUsers, string[]>) => Promise<boolean>
	deleteClassSchemes: (classId: string) => Promise<boolean>
	markRead: (classId: string, userId: string) => Promise<boolean>
}