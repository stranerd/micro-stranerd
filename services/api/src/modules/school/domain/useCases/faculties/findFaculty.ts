import { IFacultyRepository } from '../../irepositories/faculties'
import { BaseUseCase } from '@utils/commons'
import { FacultyEntity } from '../../entities/faculties'

export class FindFacultyUseCase extends BaseUseCase<string, FacultyEntity | null> {
	private repository: IFacultyRepository

	constructor (repository: IFacultyRepository) {
		super()
		this.repository = repository
	}

	async execute (id: string) {
		return await this.repository.find(id)
	}
}
