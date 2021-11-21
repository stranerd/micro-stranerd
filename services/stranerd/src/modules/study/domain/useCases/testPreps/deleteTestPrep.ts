import { ITestPrepRepository } from '../../irepositories/testPreps'
import { BaseUseCase } from '@utils/commons'

export class DeleteTestPrepUseCase extends BaseUseCase<string, boolean> {
	private repository: ITestPrepRepository

	constructor (repository: ITestPrepRepository) {
		super()
		this.repository = repository
	}

	async execute (id: string) {
		return await this.repository.delete(id)
	}
}
