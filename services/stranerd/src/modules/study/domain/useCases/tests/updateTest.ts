import { TestToModel } from '../../../data/models/tests'
import { ITestRepository } from '../../irepositories/tests'
import { BaseUseCase } from '@utils/commons'
import { TestEntity } from '../../entities/tests'

type Input = { id: string, userId: string, data: Partial<TestToModel> }

export class UpdateTestUseCase extends BaseUseCase<Input, TestEntity | null> {
	private repository: ITestRepository

	constructor (repository: ITestRepository) {
		super()
		this.repository = repository
	}

	async execute (input: Input) {
		return await this.repository.update(input.id, input.userId, input.data)
	}
}
