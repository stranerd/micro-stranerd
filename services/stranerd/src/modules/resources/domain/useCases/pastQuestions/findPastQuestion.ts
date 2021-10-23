import { IPastQuestionRepository } from '../../irepositories/pastQuestions'
import { BaseUseCase } from '@utils/commons'
import { PastQuestionEntity } from '../../../domain/entities/pastQuestions'

export class FindPastQuestionUseCase<Entity extends PastQuestionEntity> extends BaseUseCase<string, Entity | null> {
	private repository: IPastQuestionRepository

	constructor (repository: IPastQuestionRepository) {
		super()
		this.repository = repository
	}

	async execute (id: string) {
		return await this.repository.find(id) as Entity
	}
}
