import { QuestionToModel } from '../../../data/models'
import { IQuestionRepository } from '../../irepositories/questions'
import { BaseUseCase } from '@utils/commons'
import { QuestionEntity } from '../../entities'

type Input = { id: string, userId: string, data: Partial<QuestionToModel> }

export class UpdateQuestionUseCase extends BaseUseCase<Input, QuestionEntity | null> {
	private repository: IQuestionRepository

	constructor (repository: IQuestionRepository) {
		super()
		this.repository = repository
	}

	async execute (input: Input) {
		return await this.repository.update(input.id, input.userId, input.data)
	}
}
