import { QueryParams } from '@utils/app/package'
import { appInstance } from '@utils/app/types'
import { ITestRepository } from '../../domain/irepositories/tests'
import { AnswerType } from '../../domain/types'
import { TestMapper } from '../mappers/tests'
import { TestFromModel, TestToModel } from '../models/tests'
import { Test } from '../mongooseModels/tests'

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
		const data = await appInstance.db.parseQueryParams<TestFromModel>(Test, query)

		return {
			...data,
			results: data.results.map((r) => this.mapper.mapFrom(r)!)
		}
	}

	async add (data: TestToModel) {
		const test = await Test.findOne({
			prepId: data.prepId,
			userId: data.userId,
			questionType: data.questionType,
			'data.type': data.data.type,
			done: false
		}) ?? await new Test(data).save()
		return this.mapper.mapFrom(test)!
	}

	async find (id: string) {
		const test = await Test.findById(id)
		return this.mapper.mapFrom(test)
	}

	async update (id: string, userId: string, data: Partial<TestToModel>) {
		const test = await Test.findOneAndUpdate({ _id: id, userId }, { $set: data }, { new: true })
		return this.mapper.mapFrom(test)
	}

	async delete (id: string, userId: string) {
		const test = await Test.findOneAndDelete({ _id: id, userId })
		return !!test
	}

	async updateAnswer (id: string, userId: string, questionId: string, answer: AnswerType) {
		const test = await Test.findOneAndUpdate({
			_id: id,
			userId,
			questions: questionId,
			done: false
		}, { $set: { [`answers.${questionId}`]: answer } })
		return !!test
	}

	async updateTaskIds (id: string, taskIds: string[]) {
		await Test.findByIdAndUpdate(id, {
			$addToSet: { taskIds: { $each: taskIds } }
		})
	}

	async deletePrepTests (prepId: string) {
		const tests = await Test.deleteMany({ prepId })
		return tests.acknowledged
	}
}
