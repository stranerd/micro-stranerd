import { IFacultyRepository } from '../../irepositories/faculties'
import { BaseUseCase } from '@utils/commons'

export class DeleteInstitutionFacultiesUseCase extends BaseUseCase<string, boolean> {
	private repository: IFacultyRepository

	constructor (repository: IFacultyRepository) {
		super()
		this.repository = repository
	}

	async execute (institutionId: string) {
		return await this.repository.deleteInstitutionFaculties(institutionId)
	}
}
