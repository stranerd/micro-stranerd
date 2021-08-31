import { IAnswerRepository } from '../../domain/irepositories/answers'
import { AnswerMapper } from '../mappers'
import { AnswerFromModel, AnswerToModel } from '../models/answers'
import { Answer } from '../mongooseModels'
import { parseQueryParams, QueryParams } from '@utils/commons'
import { UserBio } from '@modules/questions/domain/types/users'

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

	async update (id: string, userId, data: Partial<AnswerToModel>) {
		const answer = await Answer.findOneAndUpdate({ _id: id, userId }, data, { new: true })
		return this.mapper.mapFrom(answer)!
	}

	async delete (id: string, userId: string) {
		const answer = await Answer.findOneAndDelete({ _id: id, userId })
		return !!answer
	}

	async modifyCommentsCount (id: string, increment: boolean) {
		const answer = await Answer.findByIdAndUpdate(id, {
			$inc: { commentsCount: increment ? 1 : -1 }
		})
		return !!answer
	}

	async updateAnswersUserBio (userId: string, userBio: UserBio) {
		const answers = await Answer.updateMany({ userId }, { userBio })
		return answers.ok === 1

	}

	async deleteQuestionAnswers (questionId: string) {
		const answers = await Answer.deleteMany({ questionId })
		return answers.ok
	}
}
