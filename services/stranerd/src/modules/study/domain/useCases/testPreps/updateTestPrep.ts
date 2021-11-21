import { TestPrepToModel } from '../../../data/models/testPreps'
import { ITestPrepRepository } from '../../irepositories/testPreps'
import { BaseUseCase } from '@utils/commons'
import { TestPrepEntity } from '../../entities/testPreps'

type Input = { id: string, data: TestPrepToModel }

export class UpdateTestPrepUseCase extends BaseUseCase<Input, TestPrepEntity | null> {
	private repository: ITestPrepRepository

	constructor (repository: ITestPrepRepository) {
		super()
		this.repository = repository
	}

	async execute (input: Input) {
		return await this.repository.update(input.id, input.data)
	}
}
