import { InstitutionEntity } from '../entities/institutions'
import { InstitutionToModel } from '../../data/models/institutions'
import { QueryParams, QueryResults } from '@utils/app/package'

export interface IInstitutionRepository {
	add: (data: InstitutionToModel) => Promise<InstitutionEntity>
	update: (id: string, data: Partial<InstitutionToModel>) => Promise<InstitutionEntity | null>
	get: (query: QueryParams) => Promise<QueryResults<InstitutionEntity>>
	find: (id: string) => Promise<InstitutionEntity | null>
	delete: (id: string) => Promise<boolean>
}
