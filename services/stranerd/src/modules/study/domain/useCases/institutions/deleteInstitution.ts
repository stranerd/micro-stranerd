import { IInstitutionRepository } from '../../irepositories/institutions'
import { BaseUseCase } from '@utils/commons'

export class DeleteInstitutionUseCase extends BaseUseCase<string, boolean> {
	private repository: IInstitutionRepository

	constructor (repository: IInstitutionRepository) {
		super()
		this.repository = repository
	}

	async execute (id: string) {
		return await this.repository.delete(id)
	}
}
