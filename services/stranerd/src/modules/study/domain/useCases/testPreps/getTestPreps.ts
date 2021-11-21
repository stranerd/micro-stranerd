import { ITestPrepRepository } from '../../irepositories/testPreps'
import { BaseUseCase, QueryParams, QueryResults } from '@utils/commons'
import { TestPrepEntity } from '../../entities/testPreps'

export class GetTestPrepsUseCase extends BaseUseCase<QueryParams, QueryResults<TestPrepEntity>> {
	private repository: ITestPrepRepository

	constructor (repository: ITestPrepRepository) {
		super()
		this.repository = repository
	}

	async execute (query: QueryParams) {
		return await this.repository.get(query)
	}
}
