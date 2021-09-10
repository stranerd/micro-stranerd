import { BaseUseCase } from '@utils/commons'
import { IChatMetaRepository } from '../../irepositories/chatMeta'
import { UserBio } from '../../types'

type Input = { userId: string, userBio: UserBio }

export class UpdateUserBiosUseCase extends BaseUseCase<Input, boolean> {
	private repository: IChatMetaRepository

	constructor (repository: IChatMetaRepository) {
		super()
		this.repository = repository
	}

	async execute (input: Input) {
		return await this.repository.updateUserBios(input.userId, input.userBio)
	}
}