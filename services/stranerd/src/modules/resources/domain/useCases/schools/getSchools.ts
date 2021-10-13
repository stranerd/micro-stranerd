import { ISchoolRepository } from '../../irepositories/schools'
import { BaseUseCase, QueryParams, QueryResults } from '@utils/commons'
import { SchoolEntity } from '../../entities/schools'

export class GetSchoolsUseCase extends BaseUseCase<QueryParams, QueryResults<SchoolEntity>> {
	private repository: ISchoolRepository

	constructor (repository: ISchoolRepository) {
		super()
		this.repository = repository
	}

	async execute (query: QueryParams) {
		return await this.repository.get(query)
	}
}
