import { IQuestionRepository } from '../../irepositories/questions'
import { BaseUseCase } from '@utils/commons'

type Input = { id: string, increment: boolean }

export class ModifyAnswerCountUseCase extends BaseUseCase<Input, boolean> {
	private repository: IQuestionRepository

	constructor (repository: IQuestionRepository) {
		super()
		this.repository = repository
	}

	async execute (input) {
		return await this.repository.modifyAnswerCount(input.id,input.increment)
	}
}
