import { TestToModel } from '../../data/models/tests'
import { ITestRepository } from '../irepositories/tests'
import { QueryParams } from '@utils/app/package'
import { AnswerType } from '../types'

export class TestsUseCase {
	private repository: ITestRepository

	constructor (repository: ITestRepository) {
		this.repository = repository
	}

	async add (data: TestToModel) {
		return await this.repository.add(data)
	}

	async delete (input: { id: string, userId: string }) {
		return await this.repository.delete(input.id, input.userId)
	}

	async find (id: string) {
		return await this.repository.find(id)
	}

	async get (query: QueryParams) {
		return await this.repository.get(query)
	}

	async update (input: { id: string, userId: string, data: Partial<TestToModel> }) {
		return await this.repository.update(input.id, input.userId, input.data)
	}

	async deletePrepTests (prepId: string) {
		return await this.repository.deletePrepTests(prepId)
	}

	async updateAnswer(input: { id: string, userId: string, questionId: string, answer: AnswerType }) {
		return await this.repository.updateAnswer(input.id, input.userId, input.questionId, input.answer)
	}

	async updateTaskIds (input: { testId: string, taskIds: string[] }) {
		return await this.repository.updateTaskIds(input.testId, input.taskIds)
	}
}
