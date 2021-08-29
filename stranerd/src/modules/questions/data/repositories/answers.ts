import { IAnswerRepository } from '../../domain/irepositories/answers'
import { AnswerMapper } from '../mappers'
import { AnswerFromModel, AnswerToModel } from '../models/answers'
import { Answer } from '../mongooseModels'
import { parseQueryParams, QueryParams } from '@utils/commons'

export class AnswerRepository implements IAnswerRepository {
	private static instance: AnswerRepository
	private mapper: AnswerMapper

	private constructor () {
		this.mapper = new AnswerMapper()
	}

	static getInstance () {
		if (!AnswerRepository.instance) AnswerRepository.instance = new AnswerRepository()
		return AnswerRepository.instance
	}

	async get (query: QueryParams) {
		const data = await parseQueryParams<AnswerFromModel>(Answer, query)

		return {
			...data,
			results: data.results.map((r) => this.mapper.mapFrom(r)!)
		}
	}

	async add (data: AnswerToModel) {
		const answer = await new Answer(data).save()
		return this.mapper.mapFrom(answer)!
	}

	async find (id: string) {
		const answer = await Answer.findById(id)
		return this.mapper.mapFrom(answer)
	}

	async update (id: string, userId, data: AnswerToModel) {
		const answer = await Answer.findOneAndUpdate({ _id: id, userId }, data, { new: true })
		return this.mapper.mapFrom(answer)!
	}

	async delete (id: string, userId: string) {
		const answer = await Answer.findOneAndDelete({ _id: id, userId })
		return !!answer
	}

	async rate (id: string, rating: number) {
		const answer = await Answer.findByIdAndUpdate(id, {
			$inc: {
				'ratings.total': rating,
				'ratings.count': 1
			}
		}, { new: true })
		return !!answer
	}

	async markAsBestAnswer (questionId: string, answerId: string): Promise<boolean> {
		const answer = await Answer.findOneAndUpdate({ _id: answerId, questionId }, { best: true }, { new: true })
		return !!answer
	}
}