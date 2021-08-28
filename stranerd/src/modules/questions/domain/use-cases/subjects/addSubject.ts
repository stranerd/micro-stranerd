import { SubjectToModel } from 'src/modules/questions/data/models'
import { ISubjectRepository } from '../../i-repositories/subject'

export class AddSubjectUseCase {
	private repository: ISubjectRepository

	constructor (repository: ISubjectRepository) {
		this.repository = repository
	}

	async call (data: SubjectToModel) {
		return await this.repository.add(data)
	}
}
