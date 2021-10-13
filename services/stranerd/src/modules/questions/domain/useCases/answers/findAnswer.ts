import { IAnswerRepository } from '../../irepositories/answers'
import { BaseUseCase } from '@utils/commons'
import { AnswerEntity } from '../../entities/answers'

export class FindAnswerUseCase extends BaseUseCase<string, AnswerEntity | null> {
	private repository: IAnswerRepository

	constructor (repository: IAnswerRepository) {
		super()
		this.repository = repository
	}

	async execute (id: string) {
		return await this.repository.find(id)
	}
}
