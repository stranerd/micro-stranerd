import { FacultyToModel } from '../../../data/models/faculties'
import { IFacultyRepository } from '../../irepositories/faculties'
import { BaseUseCase } from '@utils/commons'
import { FacultyEntity } from '../../entities/faculties'

export class AddFacultyUseCase extends BaseUseCase<FacultyToModel, FacultyEntity> {
	private repository: IFacultyRepository

	constructor (repository: IFacultyRepository) {
		super()
		this.repository = repository
	}

	async execute (data: FacultyToModel) {
		return await this.repository.add(data)
	}
}
