import { PastQuestionToModel } from '../../../data/models/pastQuestions'
import { IPastQuestionRepository } from '../../irepositories/pastQuestions'
import { BaseUseCase } from '@utils/commons'
import { PastQuestionEntity } from '../../entities/pastQuestions'

type Input = { id: string, data: PastQuestionToModel }

export class UpdatePastQuestionUseCase extends BaseUseCase<Input, PastQuestionEntity | null> {

	private repository: IPastQuestionRepository

	constructor (repository: IPastQuestionRepository) {
		super()
		this.repository = repository
	}

	async execute (input: Input) {
		return await this.repository.update(input.id, input.data)
	}
}
