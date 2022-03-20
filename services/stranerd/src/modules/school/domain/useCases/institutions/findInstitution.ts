import { IInstitutionRepository } from '../../irepositories/institutions'
import { BaseUseCase } from '@utils/commons'
import { InstitutionEntity } from '../../entities/institutions'

export class FindInstitutionUseCase extends BaseUseCase<string, InstitutionEntity | null> {
	private repository: IInstitutionRepository

	constructor (repository: IInstitutionRepository) {
		super()
		this.repository = repository
	}

	async execute (id: string) {
		return await this.repository.find(id)
	}
}
