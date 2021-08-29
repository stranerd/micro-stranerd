import { IAnswerRepository } from '../../irepositories/answers'
import { AnswerToModel } from '../../../data/models'
import { BaseUseCase } from '@utils/commons'
import { AnswerEntity } from '../../entities'

export class AddAnswerUseCase extends BaseUseCase<AnswerToModel, AnswerEntity> {
	private repository: IAnswerRepository

	constructor (repository: IAnswerRepository) {
		super()
		this.repository = repository
	}

	async execute (data: AnswerToModel) {
		return await this.repository.add(data)
	}
}
