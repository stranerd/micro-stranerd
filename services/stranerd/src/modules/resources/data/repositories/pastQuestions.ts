import { IPastQuestionRepository } from '../../domain/irepositories/pastQuestions'
import { PastQuestionFromModel, PastQuestionToModel } from '../models/pastQuestions'
import { BaseMapper, mongoose, parseQueryParams, QueryParams } from '@utils/commons'
import { PastQuestionObj, PastQuestionTheory } from '../mongooseModels/pastQuestions'
import { PastQuestionObjMapper, PastQuestionTheoryMapper } from '../mappers/pastQuestions'

class PastQuestionRepository implements IPastQuestionRepository {
	private readonly model: mongoose.Model<any>
	private readonly mapper: BaseMapper<any, any, any>

	constructor (model: mongoose.Model<any>, mapper: BaseMapper<any, any, any>) {
		this.model = model
		this.mapper = mapper
	}

	async get (query: QueryParams) {
		const data = await parseQueryParams<PastQuestionFromModel>(this.model, query)

		return {
			...data,
			results: data.results.map((r) => this.mapper.mapFrom(r)!)
		}
	}

	async add (data: PastQuestionToModel) {
		const pastQuestion = await new this.model(data).save()
		return this.mapper.mapFrom(pastQuestion)!
	}

	async find (id: string) {
		const pastQuestion = await this.model.findById(id)
		return this.mapper.mapFrom(pastQuestion)
	}

	async update (id: string, data: PastQuestionToModel) {
		const pastQuestion = await this.model.findOneAndUpdate({ _id: id }, { $set: data })
		return this.mapper.mapFrom(pastQuestion)
	}

	async delete (id: string) {
		const pastQuestion = await this.model.findOneAndDelete({ _id: id })
		return !!pastQuestion
	}
}

export class PastQuestionTheoryRepository extends PastQuestionRepository {
	private static instance: PastQuestionTheoryRepository

	static getInstance () {
		if (!PastQuestionTheoryRepository.instance) PastQuestionTheoryRepository.instance = new PastQuestionRepository(PastQuestionTheory, new PastQuestionTheoryMapper())
		return PastQuestionTheoryRepository.instance
	}
}

export class PastQuestionObjRepository extends PastQuestionRepository {
	private static instance: PastQuestionObjRepository

	static getInstance () {
		if (!PastQuestionObjRepository.instance) PastQuestionObjRepository.instance = new PastQuestionRepository(PastQuestionObj, new PastQuestionObjMapper())
		return PastQuestionObjRepository.instance
	}
}