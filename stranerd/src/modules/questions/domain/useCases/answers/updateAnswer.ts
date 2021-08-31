import { IAnswerRepository } from '../../irepositories/answers'
import { BaseUseCase } from '@utils/commons'
import { AnswerToModel } from '../../../data/models'
import { AnswerEntity } from '../../entities'

type Input = { id: string, userId: string, data: Partial<AnswerToModel> }

export class UpdateAnswerUseCase extends BaseUseCase<Input, AnswerEntity> {
	private repository: IAnswerRepository

	constructor (repository: IAnswerRepository) {
		super()
		this.repository = repository
	}

	async execute (input: Input) {
		return await this.repository.update(input.id, input.userId, input.data)
	}
}
