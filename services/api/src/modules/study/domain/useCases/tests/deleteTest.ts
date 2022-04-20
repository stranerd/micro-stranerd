import { ITestRepository } from '../../irepositories/tests'
import { BaseUseCase } from '@utils/commons'

type Input = { id: string, userId: string }

export class DeleteTestUseCase extends BaseUseCase<Input, boolean> {
	private repository: ITestRepository

	constructor (repository: ITestRepository) {
		super()
		this.repository = repository
	}

	async execute (input: Input) {
		return await this.repository.delete(input.id, input.userId)
	}
}
