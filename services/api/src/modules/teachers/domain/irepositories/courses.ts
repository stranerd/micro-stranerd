import { CourseEntity } from '../entities/courses'
import { CourseToModel } from '../../data/models/courses'
import { QueryParams, QueryResults } from '@utils/app/package'
import { EmbeddedUser } from '../types'

export interface ICourseRepository {
	add: (data: CourseToModel) => Promise<CourseEntity>
	get: (condition: QueryParams) => Promise<QueryResults<CourseEntity>>
	find: (id: string) => Promise<CourseEntity | null>
	update: (id: string, userId: string, data: Partial<CourseToModel>) => Promise<CourseEntity | null>
	delete: (id: string, userId: string) => Promise<boolean>
	updateUserBio: (user: EmbeddedUser) => Promise<boolean>
}