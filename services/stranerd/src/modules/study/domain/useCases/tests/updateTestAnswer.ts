import { ITestRepository } from '../../irepositories/tests'
import { BaseUseCase } from '@utils/commons'

type Input = { id: string, userId: string, questionId: string, answer: number }

export class UpdateTestAnswerUseCase extends BaseUseCase<Input, boolean> {
	private repository: ITestRepository

	constructor (repository: ITestRepository) {
		super()
		this.repository = repository
	}

	async execute (input: Input) {
		return await this.repository.updateAnswer(input.id, input.userId, input.questionId, input.answer)
	}
}
