import { IInstitutionRepository } from '../../irepositories/institutions'
import { BaseUseCase, QueryParams, QueryResults } from '@utils/commons'
import { InstitutionEntity } from '../../entities/institutions'

export class GetInstitutionsUseCase extends BaseUseCase<QueryParams, QueryResults<InstitutionEntity>> {
	private repository: IInstitutionRepository

	constructor (repository: IInstitutionRepository) {
		super()
		this.repository = repository
	}

	async execute (query: QueryParams) {
		return await this.repository.get(query)
	}
}
