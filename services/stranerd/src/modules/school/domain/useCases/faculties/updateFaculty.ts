import { FacultyToModel } from '../../../data/models/faculties'
import { IFacultyRepository } from '../../irepositories/faculties'
import { BaseUseCase } from '@utils/commons'
import { FacultyEntity } from '../../entities/faculties'

type Input = { id: string, data: Partial<FacultyToModel> }

export class UpdateFacultyUseCase extends BaseUseCase<Input, FacultyEntity | null> {
	private repository: IFacultyRepository

	constructor (repository: IFacultyRepository) {
		super()
		this.repository = repository
	}

	async execute (input: Input) {
		return await this.repository.update(input.id, input.data)
	}
}
