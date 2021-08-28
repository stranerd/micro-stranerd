import { GetClause } from '@utils/paginator'
import { ISubjectRepository } from '../../i-repositories/subject'

export class GetSubjectsUseCase {
	private repository: ISubjectRepository

	constructor (repository: ISubjectRepository) {
		this.repository = repository
	}

	async call (conditions: GetClause) {
		return await this.repository.get(conditions)
	}
}
