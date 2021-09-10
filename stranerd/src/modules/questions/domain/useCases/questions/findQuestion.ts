import { IQuestionRepository } from '../../irepositories/questions'
import { BaseUseCase } from '@utils/commons'
import { QuestionEntity } from '../../../domain/entities'

export class FindQuestionUseCase extends BaseUseCase<string, QuestionEntity | null> {
	private repository: IQuestionRepository

	constructor (repository: IQuestionRepository) {
		super()
		this.repository = repository
	}

	async execute (id: string) {
		return await this.repository.find(id)
	}
}
