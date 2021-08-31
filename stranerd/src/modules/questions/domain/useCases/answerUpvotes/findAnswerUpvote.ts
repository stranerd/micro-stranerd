import { IAnswerUpvoteRepository } from '../../irepositories/answerUpvotes'
import { BaseUseCase } from '@utils/commons'
import { AnswerUpvoteEntity } from '../../entities'

export class FindAnswerUpvoteUseCase extends BaseUseCase<string, AnswerUpvoteEntity | null> {
	private repository: IAnswerUpvoteRepository

	constructor (repository: IAnswerUpvoteRepository) {
		super()
		this.repository = repository
	}

	async execute (id: string) {
		return await this.repository.find(id)
	}
}
