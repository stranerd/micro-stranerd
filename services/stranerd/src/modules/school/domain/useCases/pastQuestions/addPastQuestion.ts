import { PastQuestionToModel } from '../../../data/models/pastQuestions'
import { IPastQuestionRepository } from '../../irepositories/pastQuestions'
import { BaseUseCase } from '@utils/commons'
import { PastQuestionEntity } from '../../entities/pastQuestions'

export class AddPastQuestionUseCase extends BaseUseCase<PastQuestionToModel, PastQuestionEntity> {
	private repository: IPastQuestionRepository

	constructor (repository: IPastQuestionRepository) {
		super()
		this.repository = repository
	}

	async execute (data: PastQuestionToModel) {
		return await this.repository.add(data)
	}
}
