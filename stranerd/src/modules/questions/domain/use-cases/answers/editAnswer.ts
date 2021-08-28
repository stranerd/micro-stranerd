import { IAnswerRepository } from '../../i-repositories/answer'
import { AnswerToModel } from 'src/modules/questions/data/models'

export class EditAnswerUseCase {
	private repository: IAnswerRepository

	constructor (repository: IAnswerRepository) {
		this.repository = repository
	}

	async call (id: string, data: AnswerToModel) {
		return await this.repository.update(id, data)
	}
}
