import { IPastQuestionRepository } from '../../irepositories/pastQuestions'
import { BaseUseCase } from '@utils/commons'

export class DeleteCourseQuestionUseCase extends BaseUseCase<string, boolean> {
	private repository: IPastQuestionRepository

	constructor (repository: IPastQuestionRepository) {
		super()
		this.repository = repository
	}

	async execute (courseId: string) {
		return await this.repository.deleteCourseQuestions(courseId)
	}
}
