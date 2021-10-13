import { QuestionToModel } from '../../../data/models/questions'
import { IQuestionRepository } from '../../irepositories/questions'
import { BaseUseCase } from '@utils/commons'
import { QuestionEntity } from '../../entities/questions'

export class AddQuestionUseCase extends BaseUseCase<QuestionToModel, QuestionEntity> {
	private repository: IQuestionRepository

	constructor (repository: IQuestionRepository) {
		super()
		this.repository = repository
	}

	async execute (data: QuestionToModel) {
		return await this.repository.add(data)
	}
}
