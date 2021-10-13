import { CourseEntity } from '../entities/courses'
import { CourseToModel } from '../../data/models/courses'
import { QueryParams, QueryResults } from '@utils/commons'

export interface ICourseRepository {
	add: (data: CourseToModel) => Promise<CourseEntity>
	update: (id: string, data: CourseToModel) => Promise<CourseEntity>
	get: (query: QueryParams) => Promise<QueryResults<CourseEntity>>
	find: (id: string) => Promise<CourseEntity | null>
	delete: (id: string) => Promise<boolean>
}
