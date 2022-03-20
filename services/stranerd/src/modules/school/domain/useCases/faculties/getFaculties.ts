import { IFacultyRepository } from '../../irepositories/faculties'
import { BaseUseCase, QueryParams, QueryResults } from '@utils/commons'
import { FacultyEntity } from '../../entities/faculties'

export class GetFacultiesUseCase extends BaseUseCase<QueryParams, QueryResults<FacultyEntity>> {
	private repository: IFacultyRepository

	constructor (repository: IFacultyRepository) {
		super()
		this.repository = repository
	}

	async execute (query: QueryParams) {
		return await this.repository.get(query)
	}
}
