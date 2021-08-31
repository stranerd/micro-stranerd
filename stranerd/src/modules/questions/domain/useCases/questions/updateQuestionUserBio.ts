import { IQuestionRepository } from '../../irepositories/questions'
import { BaseUseCase } from '@utils/commons'
import { UserBio } from '../../types/users'

type Input = { userId: string, userBio: UserBio }

export class UpdateQuestionUserBioUseCase extends BaseUseCase<Input, boolean> {
	private repository: IQuestionRepository

	constructor (repository: IQuestionRepository) {
		super()
		this.repository = repository
	}

	async execute (input) {
		return await this.repository.updateQuestionUserBio(input.userId,input.userBio)
	}
}
