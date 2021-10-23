import { PastQuestionToModel } from '../../../data/models/pastQuestions'
import { IPastQuestionRepository } from '../../irepositories/pastQuestions'
import { BaseUseCase } from '@utils/commons'
import { PastQuestionEntity } from '../../entities/pastQuestions'

export class AddPastQuestionUseCase<ToModel extends PastQuestionToModel, Entity extends PastQuestionEntity> extends BaseUseCase<ToModel, Entity> {
	private repository: IPastQuestionRepository

	constructor (repository: IPastQuestionRepository) {
		super()
		this.repository = repository
	}

	async execute (data: ToModel) {
		return await this.repository.add(data) as Entity
	}
}
