import { ISchoolRepository } from '../../irepositories/schools'
import { BaseUseCase } from '@utils/commons'

export class DeleteSchoolUseCase extends BaseUseCase<string, boolean> {
	private repository: ISchoolRepository

	constructor (repository: ISchoolRepository) {
		super()
		this.repository = repository
	}

	async execute (id: string) {
		return await this.repository.delete(id)
	}
}
