import { IQuestionRepository } from '../../irepositories/questions'
import { BaseUseCase } from '@utils/commons'
import { Media } from '../../types'

type Input = { classId: string, className: string, classAvatar: Media }

export class UpdateQuestionsClassNameUseCase extends BaseUseCase<Input, boolean> {
	private repository: IQuestionRepository

	constructor (repository: IQuestionRepository) {
		super()
		this.repository = repository
	}

	async execute (input: Input) {
		return await this.repository.updateQuestionsClassName(input.classId, input.className, input.classAvatar)
	}
}
