import { ISubjectRepository } from '../../irepositories/subjects'
import { BaseUseCase } from '@utils/commons'
import { SubjectEntity } from '../../entities'

export class FindSubjectUseCase extends BaseUseCase<string, SubjectEntity | null> {
	private repository: ISubjectRepository

	constructor (repository: ISubjectRepository) {
		super()
		this.repository = repository
	}

	async execute (id: string) {
		return await this.repository.find(id)
	}
}
