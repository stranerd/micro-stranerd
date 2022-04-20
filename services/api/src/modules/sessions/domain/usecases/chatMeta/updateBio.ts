import { BaseUseCase } from '@utils/commons'
import { IChatMetaRepository } from '../../irepositories/chatMeta'
import { UserBio, UserRoles } from '../../types'

type Input = { id: string, userBio: UserBio, userRoles: UserRoles }

export class UpdateBioUseCase extends BaseUseCase<Input, boolean> {
	private repository: IChatMetaRepository

	constructor (repository: IChatMetaRepository) {
		super()
		this.repository = repository
	}

	async execute (input: Input) {
		return await this.repository.updateBio(input.id, input.userBio, input.userRoles)
	}
}