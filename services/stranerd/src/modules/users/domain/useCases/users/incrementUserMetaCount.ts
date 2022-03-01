import { BaseUseCase } from '@utils/commons'
import { IUserRepository } from '../../i-repositories/users'
import { UserAccount } from '../../types'

type Input = { id: string, value: 1 | -1, property: keyof Omit<UserAccount['meta'], 'tutorSessions' | 'sessions'> }

export class IncrementUserMetaCountUseCase implements BaseUseCase<Input, void> {
	repository: IUserRepository

	constructor (repo: IUserRepository) {
		this.repository = repo
	}

	async execute (params: Input) {
		return await this.repository.incrementUserMetaProperty(params.id, params.property, params.value)
	}
}