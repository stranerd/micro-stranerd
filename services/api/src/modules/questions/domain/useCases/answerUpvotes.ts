import { IAnswerUpvoteRepository } from '../irepositories/answerUpvotes'
import { AnswerUpvoteToModel } from '../../data/models/answerUpvotes'
import { QueryParams } from '@utils/commons'

export class AnswerUpvotesUseCase {
	private repository: IAnswerUpvoteRepository

	constructor (repository: IAnswerUpvoteRepository) {
		this.repository = repository
	}

	async add (data: AnswerUpvoteToModel) {
		return await this.repository.add(data)
	}

	async deleteAnswerVotes (answerId: string) {
		return await this.repository.deleteAnswerVotes(answerId)
	}

	async find (id: string) {
		return await this.repository.find(id)
	}

	async get (query: QueryParams) {
		return await this.repository.get(query)
	}
}
