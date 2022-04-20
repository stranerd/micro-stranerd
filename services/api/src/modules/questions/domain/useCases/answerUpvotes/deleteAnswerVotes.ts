import { IAnswerUpvoteRepository } from '../../irepositories/answerUpvotes'
import { BaseUseCase } from '@utils/commons'

export class DeleteAnswerVotesUseCase extends BaseUseCase<string, boolean> {
	private repository: IAnswerUpvoteRepository

	constructor (repository: IAnswerUpvoteRepository) {
		super()
		this.repository = repository
	}

	async execute (answerId: string) {
		return await this.repository.deleteAnswerVotes(answerId)
	}
}
