import { SubjectEntity } from '../entities/subjects'
import { SubjectToModel } from '../../data/models/subjects'
import { QueryParams, QueryResults } from '@utils/commons'

export interface ISubjectRepository {
	add: (data: SubjectToModel) => Promise<SubjectEntity>
	update: (id: string, data: SubjectToModel) => Promise<SubjectEntity>
	get: (query: QueryParams) => Promise<QueryResults<SubjectEntity>>
	find: (id: string) => Promise<SubjectEntity | null>
	delete: (id: string) => Promise<boolean>
}
