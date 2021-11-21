import { ITestPrepRepository } from '../../irepositories/testPreps'
import { BaseUseCase } from '@utils/commons'
import { TestPrepEntity } from '../../entities/testPreps'

export class FindTestPrepUseCase extends BaseUseCase<string, TestPrepEntity | null> {
	private repository: ITestPrepRepository

	constructor (repository: ITestPrepRepository) {
		super()
		this.repository = repository
	}

	async execute (id: string) {
		return await this.repository.find(id)
	}
}
