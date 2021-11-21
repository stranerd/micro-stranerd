import { TestEntity } from '../entities/tests'
import { TestToModel } from '../../data/models/tests'
import { QueryParams, QueryResults } from '@utils/commons'

export interface ITestRepository {
	add: (data: TestToModel) => Promise<TestEntity>
	update: (id: string, userId: string, data: Partial<TestToModel>) => Promise<TestEntity | null>
	get: (query: QueryParams) => Promise<QueryResults<TestEntity>>
	find: (id: string, userId: string) => Promise<TestEntity | null>
	delete: (id: string, userId: string) => Promise<boolean>
}
