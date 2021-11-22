import { ITestRepository } from '../../irepositories/tests'
import { BaseUseCase } from '@utils/commons'
import { TestEntity } from '../../../domain/entities/tests'

type Input = { id: string, userId: string }

export class FindTestUseCase extends BaseUseCase<Input, TestEntity | null> {
	private repository: ITestRepository

	constructor (repository: ITestRepository) {
		super()
		this.repository = repository
	}

	async execute (input: Input) {
		return await this.repository.find(input.id, input.userId)
	}
}
