import { IAnswerRepository } from '../../i-repositories/answer'
import { AnswerToModel } from '../../../../../modules/questions/data/models'

export class AddAnswerUseCase {
	private repository: IAnswerRepository

	constructor (repository: IAnswerRepository) {
		this.repository = repository
	}

	async call (data: AnswerToModel) {
		return await this.repository.add(data)
	}
}
