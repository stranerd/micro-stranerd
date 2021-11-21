import { TestPrepEntity } from '../../domain/entities/testPreps'
import { ITestPrepRepository } from '../../domain/irepositories/testPreps'
import { TestPrepMapper } from '../mappers/testPreps'
import { TestPrepFromModel, TestPrepToModel } from '../models/testPreps'
import { parseQueryParams, QueryParams } from '@utils/commons'
import { TestPrep } from '../mongooseModels/testPreps'

export class TestPrepRepository implements ITestPrepRepository {
	private static instance: TestPrepRepository
	private mapper: TestPrepMapper

	private constructor () {
		this.mapper = new TestPrepMapper()
	}

	static getInstance () {
		if (!TestPrepRepository.instance) TestPrepRepository.instance = new TestPrepRepository()
		return TestPrepRepository.instance
	}

	async get (query: QueryParams) {
		const data = await parseQueryParams<TestPrepFromModel>(TestPrep, query)

		return {
			...data,
			results: data.results.map((r) => this.mapper.mapFrom(r)!)
		}
	}

	async delete (id: string): Promise<boolean> {
		const deleteData = await TestPrep.findByIdAndDelete(id)
		return !!deleteData
	}

	async add (data: TestPrepToModel) {
		const testPrep = await new TestPrep(data).save()
		return this.mapper.mapFrom(testPrep)!
	}

	async update (id: string, data: TestPrepToModel) {
		const testPrep = await TestPrep.findByIdAndUpdate(id, { $set: data }, { new: true })
		return this.mapper.mapFrom(testPrep)
	}

	async find (id: string): Promise<TestPrepEntity | null> {
		const testPrep = await TestPrep.findById(id)
		return this.mapper.mapFrom(testPrep)
	}
}
