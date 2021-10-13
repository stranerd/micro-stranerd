import { SchoolEntity } from '../entities/schools'
import { SchoolToModel } from '../../data/models/schools'
import { QueryParams, QueryResults } from '@utils/commons'

export interface ISchoolRepository {
	add: (data: SchoolToModel) => Promise<SchoolEntity>
	update: (id: string, data: SchoolToModel) => Promise<SchoolEntity>
	get: (query: QueryParams) => Promise<QueryResults<SchoolEntity>>
	find: (id: string) => Promise<SchoolEntity | null>
	delete: (id: string) => Promise<boolean>
}
