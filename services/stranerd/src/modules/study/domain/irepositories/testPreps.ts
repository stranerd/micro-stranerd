import { TestPrepEntity } from '../entities/testPreps'
import { TestPrepToModel } from '../../data/models/testPreps'
import { QueryParams, QueryResults } from '@utils/commons'

export interface ITestPrepRepository {
	add: (data: TestPrepToModel) => Promise<TestPrepEntity>
	update: (id: string, data: TestPrepToModel) => Promise<TestPrepEntity>
	get: (query: QueryParams) => Promise<QueryResults<TestPrepEntity>>
	find: (id: string) => Promise<TestPrepEntity | null>
	delete: (id: string) => Promise<boolean>
}
