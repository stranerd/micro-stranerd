import { IQuestionRepository } from '../../irepositories/questions'
import { BaseUseCase } from '@stranerd/api-commons'
import { QuestionEntity } from '@modules/questions/domain/entities'

export class FindQuestionUseCase extends BaseUseCase<string, QuestionEntity | null> {
	private repository: IQuestionRepository

	constructor (repository: IQuestionRepository) {
		super()
		this.repository = repository
	}

	async execute (input) {
		return await this.repository.find(input.id,input.userId)
	}
}
