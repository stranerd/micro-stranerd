import { InstitutionToModel } from '../../../data/models/institutions'
import { IInstitutionRepository } from '../../irepositories/institutions'
import { BaseUseCase } from '@utils/commons'
import { InstitutionEntity } from '../../entities/institutions'

export class AddInstitutionUseCase extends BaseUseCase<InstitutionToModel, InstitutionEntity> {
	private repository: IInstitutionRepository

	constructor (repository: IInstitutionRepository) {
		super()
		this.repository = repository
	}

	async execute (data: InstitutionToModel) {
		return await this.repository.add(data)
	}
}
