import { IAnswerCommentRepository } from '../../domain/irepositories/answerComments'
import { AnswerCommentMapper } from '../mappers'
import { AnswerCommentFromModel, AnswerCommentToModel } from '../models'
import { parseQueryParams, QueryParams } from '@utils/commons'
import { AnswerComment } from '@modules/questions/data/mongooseModels'

export class AnswerCommentRepository implements IAnswerCommentRepository {
	private static instance: AnswerCommentRepository
	private mapper: AnswerCommentMapper

	private constructor () {
		this.mapper = new AnswerCommentMapper()
	}

	static getInstance () {
		if (!AnswerCommentRepository.instance) AnswerCommentRepository.instance = new AnswerCommentRepository()
		return AnswerCommentRepository.instance
	}

	async get (query: QueryParams) {
		const data = await parseQueryParams<AnswerCommentFromModel>(AnswerComment, query)

		return {
			...data,
			results: data.results.map((r) => this.mapper.mapFrom(r)!)
		}
	}

	async add (data: AnswerCommentToModel) {
		const comment = await new AnswerComment(data).save()
		return this.mapper.mapFrom(comment)!
	}

	async find (id: string) {
		const comment = await AnswerComment.findById(id)
		return this.mapper.mapFrom(comment)
	}
}
