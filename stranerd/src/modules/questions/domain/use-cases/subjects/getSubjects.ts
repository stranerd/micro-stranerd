import { DatabaseGetClauses } from '@modules/core'
import { ISubjectRepository } from '../../irepositories/isubject'

export class GetSubjectsUseCase {
	private repository: ISubjectRepository

	constructor (repository: ISubjectRepository) {
		this.repository = repository
	}

	async call () {
		const conditions: DatabaseGetClauses = {
			order: { field: 'name' }
		}
		return await this.repository.get(conditions)
	}
}
