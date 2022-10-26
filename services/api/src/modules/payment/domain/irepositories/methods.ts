import { MethodToModel } from '../../data/models/methods'
import { MethodEntity } from '../entities/methods'
import { QueryParams, QueryResults } from '@utils/app/commons'

export interface IMethodRepository {
	create: (data: MethodToModel) => Promise<MethodEntity>
	get: (query: QueryParams) => Promise<QueryResults<MethodEntity>>
	find: (id: string) => Promise<MethodEntity | null>
	makePrimary: (id: string, userId: string) => Promise<MethodEntity | null>
	markExpireds: () => Promise<boolean>
	delete: (id: string, userId: string) => Promise<boolean>
}
