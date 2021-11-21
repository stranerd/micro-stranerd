import { IPastQuestionRepository } from '../../irepositories/pastQuestions'
import { BaseUseCase } from '@utils/commons'
import { PastQuestionEntity } from '../../entities/pastQuestions'

export class FindPastQuestionUseCase extends BaseUseCase<string, PastQuestionEntity | null> {
	private repository: IPastQuestionRepository

	constructor (repository: IPastQuestionRepository) {
		super()
		this.repository = repository
	}

	async execute (id: string) {
		return await this.repository.find(id)
	}
}
