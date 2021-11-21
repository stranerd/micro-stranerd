import { ITestRepository } from '../../irepositories/tests'
import { BaseUseCase, QueryParams, QueryResults } from '@utils/commons'
import { TestEntity } from '../../entities/tests'

export class GetTestsUseCase extends BaseUseCase<QueryParams, QueryResults<TestEntity>> {
	private repository: ITestRepository

	constructor (repository: ITestRepository) {
		super()
		this.repository = repository
	}

	async execute (query: QueryParams) {
		return await this.repository.get(query)
	}
}
