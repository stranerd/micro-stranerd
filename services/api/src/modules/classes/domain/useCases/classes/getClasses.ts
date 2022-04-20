import { IClassRepository } from '../../irepositories/classes'
import { BaseUseCase, QueryParams, QueryResults } from '@utils/commons'
import { ClassEntity } from '../../entities/classes'

export class GetClassesUseCase extends BaseUseCase<QueryParams, QueryResults<ClassEntity>> {
	private repository: IClassRepository

	constructor (repository: IClassRepository) {
		super()
		this.repository = repository
	}

	async execute (query: QueryParams) {
		return await this.repository.get(query)
	}
}
