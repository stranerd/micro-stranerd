import { IQuestionRepository } from '../../irepositories/questions'
import { BaseUseCase } from '@utils/commons'

type Input = { id: string, answerId: string, userId: string, add: boolean }

export class UpdateBestAnswerUseCase extends BaseUseCase<Input, boolean> {
	private repository: IQuestionRepository

	constructor (repository: IQuestionRepository) {
		super()
		this.repository = repository
	}

	async execute (input: Input) {
		return await this.repository.updateBestAnswer(input.id, input.answerId, input.userId, input.add)
	}
}
