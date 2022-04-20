import { IFlashCardRepository } from '../../irepositories/flashCards'
import { BaseUseCase } from '@utils/commons'
import { UserBio, UserRoles } from '../../types'

type Input = { userId: string, userBio: UserBio, userRoles: UserRoles }

export class UpdateFlashCardsUserBioUseCase extends BaseUseCase<Input, boolean> {
	private repository: IFlashCardRepository

	constructor (repository: IFlashCardRepository) {
		super()
		this.repository = repository
	}

	async execute (input: Input) {
		return await this.repository.updateFlashCardsUserBio(input.userId, input.userBio, input.userRoles)
	}
}
