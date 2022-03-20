import { InstitutionToModel } from '../../../data/models/institutions'
import { IInstitutionRepository } from '../../irepositories/institutions'
import { BaseUseCase } from '@utils/commons'
import { InstitutionEntity } from '../../entities/institutions'

type Input = { id: string, data: InstitutionToModel }

export class UpdateInstitutionUseCase extends BaseUseCase<Input, InstitutionEntity | null> {
	private repository: IInstitutionRepository

	constructor (repository: IInstitutionRepository) {
		super()
		this.repository = repository
	}

	async execute (input: Input) {
		return await this.repository.update(input.id, input.data)
	}
}
