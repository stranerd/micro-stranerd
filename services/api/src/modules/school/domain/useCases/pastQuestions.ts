import { PastQuestionToModel } from '../../data/models/pastQuestions'
import { IPastQuestionRepository } from '../irepositories/pastQuestions'
import { QueryParams } from '@utils/app/package'

export class PastQuestionsUseCase {
	private repository: IPastQuestionRepository

	constructor (repository: IPastQuestionRepository) {
		this.repository = repository
	}

	async add (data: PastQuestionToModel) {
		return await this.repository.add(data)
	}

	async delete (id: string) {
		return await this.repository.delete(id)
	}

	async find (id: string) {
		return await this.repository.find(id)
	}

	async get (query: QueryParams) {
		return await this.repository.get(query)
	}

	async update (input: { id: string, data: Partial<PastQuestionToModel> }) {
		return await this.repository.update(input.id, input.data)
	}

	async deleteCourseQuestions (courseId: string) {
		return await this.repository.deleteCourseQuestions(courseId)
	}
}
