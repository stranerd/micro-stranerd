import { IAnswerRepository } from '../../irepositories/answers'
import { BaseUseCase } from '@utils/commons'
import { UserBio } from '../../types/users'

type Input = { userId: string, userBio: UserBio }

export class UpdateAnswerUserBioUseCase extends BaseUseCase<Input, boolean> {
	private repository: IAnswerRepository

	constructor (repository: IAnswerRepository) {
		super()
		this.repository = repository
	}

	async execute (input) {
		return await this.repository.updateAnswerUserBio(input.userId,input.userBio)
	}
}
