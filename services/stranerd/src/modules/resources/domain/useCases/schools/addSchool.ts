import { SchoolToModel } from '../../../data/models/schools'
import { ISchoolRepository } from '../../irepositories/schools'
import { BaseUseCase } from '@utils/commons'
import { SchoolEntity } from '../../entities/schools'

export class AddSchoolUseCase extends BaseUseCase<SchoolToModel, SchoolEntity> {
	private repository: ISchoolRepository

	constructor (repository: ISchoolRepository) {
		super()
		this.repository = repository
	}

	async execute (data: SchoolToModel) {
		return await this.repository.add(data)
	}
}
