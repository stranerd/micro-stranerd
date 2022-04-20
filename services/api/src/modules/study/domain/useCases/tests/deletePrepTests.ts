import { ITestRepository } from '../../irepositories/tests'
import { BaseUseCase } from '@utils/commons'

export class DeletePrepTestsUseCase extends BaseUseCase<string, boolean> {
	private repository: ITestRepository

	constructor (repository: ITestRepository) {
		super()
		this.repository = repository
	}

	async execute (prepId: string) {
		return await this.repository.deletePrepTests(prepId)
	}
}
