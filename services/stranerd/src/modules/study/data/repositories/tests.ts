import { ITestRepository } from '../../domain/irepositories/tests'
import { TestMapper } from '../mappers/tests'
import { TestFromModel, TestToModel } from '../models/tests'
import { Test } from '../mongooseModels/tests'
import { parseQueryParams, QueryParams } from '@utils/commons'

export class TestRepository implements ITestRepository {
	private static instance: TestRepository
	private mapper: TestMapper

	private constructor () {
		this.mapper = new TestMapper()
	}

	static getInstance () {
		if (!TestRepository.instance) TestRepository.instance = new TestRepository()
		return TestRepository.instance
	}

	async get (query: QueryParams) {
		const data = await parseQueryParams<TestFromModel>(Test, query)

		return {
			...data,
			results: data.results.map((r) => this.mapper.mapFrom(r)!)
		}
	}

	async add (data: TestToModel) {
		const test = await new Test(data).save()
		return this.mapper.mapFrom(test)!
	}

	async find (id: string, userId: string) {
		const test = await Test.findOne({ _id: id, userId })
		return this.mapper.mapFrom(test)
	}

	async update (id: string, userId: string, data: Partial<TestToModel>) {
		const test = await Test.findOneAndUpdate({ _id: id, userId }, { $set: data })
		return this.mapper.mapFrom(test)
	}

	async delete (id: string, userId: string) {
		const test = await Test.findOneAndDelete({ _id: id, userId })
		return !!test
	}
}
