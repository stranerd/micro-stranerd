import { ISubjectRepository } from '../../irepositories/subjects'
import { BaseUseCase, QueryParams, QueryResults } from '@utils/commons'
import { SubjectEntity } from '../../entities/subjects'

export class GetSubjectsUseCase extends BaseUseCase<QueryParams, QueryResults<SubjectEntity>> {
	private repository: ISubjectRepository

	constructor (repository: ISubjectRepository) {
		super()
		this.repository = repository
	}

	async execute (query: QueryParams) {
		return await this.repository.get(query)
	}
}
