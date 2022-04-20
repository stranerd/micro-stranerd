import { TestPrepToModel } from '../../../data/models/testPreps'
import { ITestPrepRepository } from '../../irepositories/testPreps'
import { BaseUseCase } from '@utils/commons'
import { TestPrepEntity } from '../../entities/testPreps'

export class AddTestPrepUseCase extends BaseUseCase<TestPrepToModel, TestPrepEntity> {
	private repository: ITestPrepRepository

	constructor (repository: ITestPrepRepository) {
		super()
		this.repository = repository
	}

	async execute (data: TestPrepToModel) {
		return await this.repository.add(data)
	}
}
