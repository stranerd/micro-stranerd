import { IFacultyRepository } from '../../irepositories/faculties'
import { BaseUseCase } from '@utils/commons'

export class DeleteFacultyUseCase extends BaseUseCase<string, boolean> {
	private repository: IFacultyRepository

	constructor (repository: IFacultyRepository) {
		super()
		this.repository = repository
	}

	async execute (id: string) {
		return await this.repository.delete(id)
	}
}
