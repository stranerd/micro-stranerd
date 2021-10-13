import { SchoolToModel } from '../../../data/models/schools'
import { ISchoolRepository } from '../../irepositories/schools'
import { BaseUseCase } from '@utils/commons'
import { SchoolEntity } from '../../entities/schools'

type Input = { id: string, data: SchoolToModel }

export class UpdateSchoolUseCase extends BaseUseCase<Input, SchoolEntity> {
	private repository: ISchoolRepository

	constructor (repository: ISchoolRepository) {
		super()
		this.repository = repository
	}

	async execute (input: Input) {
		return await this.repository.update(input.id, input.data)
	}
}
