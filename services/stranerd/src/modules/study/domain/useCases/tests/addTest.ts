import { TestToModel } from '../../../data/models/tests'
import { ITestRepository } from '../../irepositories/tests'
import { BaseUseCase } from '@utils/commons'
import { TestEntity } from '../../entities/tests'

export class AddTestUseCase extends BaseUseCase<TestToModel, TestEntity> {
	private repository: ITestRepository

	constructor (repository: ITestRepository) {
		super()
		this.repository = repository
	}

	async execute (data: TestToModel) {
		return await this.repository.add(data)
	}
}
