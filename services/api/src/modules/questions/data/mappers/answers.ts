import { BaseMapper } from '@utils/app/package'
import { AnswerFromModel, AnswerToModel } from '../models/answers'
import { AnswerEntity } from '../../domain/entities/answers'

export class AnswerMapper extends BaseMapper<AnswerFromModel, AnswerToModel, AnswerEntity> {
	mapFrom (model: AnswerFromModel | null) {
		if (!model) return null
		const {
			_id, body, questionId, attachments,
			user, best, tagId, meta,
			createdAt, updatedAt
		} = model
		return new AnswerEntity({
			id: _id.toString(), body, questionId,
			user, best, attachments, tagId, meta,
			createdAt, updatedAt
		})
	}

	mapTo (entity: AnswerEntity) {
		return {
			body: entity.body,
			attachments: entity.attachments,
			questionId: entity.questionId,
			tagId: entity.tagId,
			user: entity.user
		}
	}
}
