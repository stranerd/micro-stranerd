import { INoteRepository } from '../../irepositories/notes'
import { BaseUseCase } from '@utils/commons'
import { UserBio } from '../../types'

type Input = { userId: string, userBio: UserBio }

export class UpdateNotesUserBioUseCase extends BaseUseCase<Input, boolean> {
	private repository: INoteRepository

	constructor (repository: INoteRepository) {
		super()
		this.repository = repository
	}

	async execute (input: Input) {
		return await this.repository.updateNotesUserBio(input.userId, input.userBio)
	}
}
