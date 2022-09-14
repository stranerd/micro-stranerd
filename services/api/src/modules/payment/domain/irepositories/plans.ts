import { PlanToModel } from '../../data/models/plans'
import { PlanEntity } from '../entities/plans'
import { QueryParams, QueryResults } from '@utils/app/package'

export interface IPlanRepository {
	init: (data: PlanToModel[]) => Promise<PlanEntity[]>
	get: (query: QueryParams) => Promise<QueryResults<PlanEntity>>
	find: (id: string) => Promise<PlanEntity | null>
}
