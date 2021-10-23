import { PastQuestionToModel } from '../../../data/models/pastQuestions'
import { IPastQuestionRepository } from '../../irepositories/pastQuestions'
import { BaseUseCase } from '@utils/commons'
import { PastQuestionEntity } from '../../entities/pastQuestions'

type Input<ToModel> = { id: string, data: ToModel }

export class UpdatePastQuestionUseCase<ToModel extends PastQuestionToModel, Entity extends PastQuestionEntity> extends BaseUseCase<Input<ToModel>, Entity | null> {

	private repository: IPastQuestionRepository

	constructor (repository: IPastQuestionRepository) {
		super()
		this.repository = repository
	}

	async execute (input: Input<ToModel>) {
		return await this.repository.update(input.id, input.data) as Entity | null
	}
}
