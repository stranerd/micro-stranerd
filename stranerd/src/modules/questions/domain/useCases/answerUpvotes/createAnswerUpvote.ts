import { IAnswerUpvoteRepository } from '../../irepositories/answerUpvotes'
import { BaseUseCase } from '@utils/commons'
import { AnswerUpvoteEntity } from '../../entities'

type Input = { answerId: string, userId: string }

export class CreateAnswerUpvoteUseCase extends BaseUseCase<Input, AnswerUpvoteEntity> {
	private repository: IAnswerUpvoteRepository

	constructor (repository: IAnswerUpvoteRepository) {
		super()
		this.repository = repository
	}

	async execute (data: Input) {
		return await this.repository.add({ ...data, vote: 1 })
	}
}
