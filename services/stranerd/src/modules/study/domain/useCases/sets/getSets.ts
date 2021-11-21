import { ISetRepository } from '../../irepositories/sets'
import { BaseUseCase, QueryParams, QueryResults } from '@utils/commons'
import { SetEntity } from '../../entities/sets'

export class GetSetsUseCase extends BaseUseCase<QueryParams, QueryResults<SetEntity>> {
	private repository: ISetRepository

	constructor (repository: ISetRepository) {
		super()
		this.repository = repository
	}

	async execute (query: QueryParams) {
		return await this.repository.get(query)
	}
}
