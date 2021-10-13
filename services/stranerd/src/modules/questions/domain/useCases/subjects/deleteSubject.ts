import { ISubjectRepository } from '../../irepositories/subjects'
import { BaseUseCase } from '@utils/commons'

export class DeleteSubjectUseCase extends BaseUseCase<string, boolean> {
	private repository: ISubjectRepository

	constructor (repository: ISubjectRepository) {
		super()
		this.repository = repository
	}

	async execute (id: string) {
		return await this.repository.delete(id)
	}
}
