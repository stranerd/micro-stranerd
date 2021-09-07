import { BaseUseCase } from '@utils/commons'
import { IUserRepository } from '../../i-repositories/users'

type Input = { id: string, value: 1 | -1 }

export class IncrementUserQuestionsCountUseCase implements BaseUseCase<Input, void> {
	repository: IUserRepository

	constructor (repo: IUserRepository) {
		this.repository = repo
	}

	async execute (params: Input) {
		return await this.repository.incrementUserMetaProperty(params.id, 'questions', params.value)
	}
}