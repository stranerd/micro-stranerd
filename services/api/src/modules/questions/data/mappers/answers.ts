import { BaseMapper } from '@utils/commons'
import { AnswerFromModel, AnswerToModel } from '../models/answers'
import { AnswerEntity } from '../../domain/entities/answers'

export class AnswerMapper extends BaseMapper<AnswerFromModel, AnswerToModel, AnswerEntity> {
	mapFrom (model: AnswerFromModel | null) {
		if (!model) return null
		const {
			_id, title, body, questionId, attachments,
			user, best, votes, tagId,
			createdAt, updatedAt
		} = model
		return new AnswerEntity({
			id: _id.toString(), title, body, questionId,
			user, best, votes, attachments, tagId,
			createdAt, updatedAt
		})
	}

	mapTo (entity: AnswerEntity) {
		return {
			title: entity.title,
			body: entity.body,
			attachments: entity.attachments,
			questionId: entity.questionId,
			tagId: entity.tagId,
			user: entity.user
		}
	}
}
