import { IAnswerRepository } from '../../irepositories/answers'
import { BaseUseCase } from '@utils/commons'
import { UserBio } from '../../types/users'

type Input = { userId: string, userBio: UserBio }

export class UpdateAnswersUserBioUseCase extends BaseUseCase<Input, boolean> {
	private repository: IAnswerRepository

	constructor (repository: IAnswerRepository) {
		super()
		this.repository = repository
	}

	async execute (input: Input) {
		return await this.repository.updateAnswersUserBio(input.userId, input.userBio)
	}
}
