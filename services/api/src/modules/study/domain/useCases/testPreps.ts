import { TestPrepToModel } from '../../data/models/testPreps'
import { ITestPrepRepository } from '../irepositories/testPreps'
import { QueryParams } from '@utils/commons'

export class TestPrepsUseCase {
	private repository: ITestPrepRepository

	constructor (repository: ITestPrepRepository) {
		this.repository = repository
	}

	async add (data: TestPrepToModel) {
		return await this.repository.add(data)
	}

	async delete (id: string) {
		return await this.repository.delete(id)
	}

	async find (id: string) {
		return await this.repository.find(id)
	}

	async get (query: QueryParams) {
		return await this.repository.get(query)
	}

	async update (input: { id: string, data: Partial<TestPrepToModel> }) {
		return await this.repository.update(input.id, input.data)
	}
}
