import { QueryParams } from '@utils/app/package'
import { appInstance } from '@utils/app/types'
import { PastQuestionEntity } from '../../domain/entities/pastQuestions'
import { IPastQuestionRepository } from '../../domain/irepositories/pastQuestions'
import { PastQuestionMapper } from '../mappers/pastQuestions'
import { PastQuestionFromModel, PastQuestionToModel } from '../models/pastQuestions'
import { PastQuestion } from '../mongooseModels/pastQuestions'

export class PastQuestionRepository implements IPastQuestionRepository {
	private static instance: PastQuestionRepository
	private mapper: PastQuestionMapper

	private constructor () {
		this.mapper = new PastQuestionMapper()
	}

	static getInstance () {
		if (!PastQuestionRepository.instance) PastQuestionRepository.instance = new PastQuestionRepository()
		return PastQuestionRepository.instance
	}

	async get (query: QueryParams) {
		const data = await appInstance.db.parseQueryParams<PastQuestionFromModel>(PastQuestion, query)

		return {
			...data,
			results: data.results.map((r) => this.mapper.mapFrom(r)!)
		}
	}

	async delete (id: string): Promise<boolean> {
		const deleteData = await PastQuestion.findByIdAndDelete(id)
		return !!deleteData
	}

	async add (data: PastQuestionToModel) {
		const pastQuestion = await new PastQuestion(data).save()
		return this.mapper.mapFrom(pastQuestion)!
	}

	async update (id: string, data: Partial<PastQuestionToModel>) {
		const pastQuestion = await PastQuestion.findByIdAndUpdate(id, { $set: data }, { new: true })
		return this.mapper.mapFrom(pastQuestion)!
	}

	async find (id: string): Promise<PastQuestionEntity | null> {
		const pastQuestion = await PastQuestion.findById(id)
		return this.mapper.mapFrom(pastQuestion)
	}

	async deleteCourseQuestions (courseId: string) {
		const pastQuestions = await PastQuestion.deleteMany({ courseId })
		return pastQuestions.acknowledged
	}
}
