import { SubjectEntity } from '../entities/subject'
import { SubjectToModel } from '../../data/models/subject'
import { GetClause } from '@utils/paginator'
import { PaginateResult } from 'mongoose'

export interface ISubjectRepository {
	add: (data: SubjectToModel) => Promise<boolean>
	update: (id: string, data: SubjectToModel) => Promise<boolean>
	get: (condition: GetClause) => Promise<PaginateResult<SubjectEntity> | null>
	find: (id: string) => Promise<SubjectEntity | null>
	delete: (id: string) => Promise<boolean>
}
