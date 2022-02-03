import { BaseMapper } from '@utils/commons'
import { AnswerFromModel, AnswerToModel } from '../models/answers'
import { AnswerEntity } from '../../domain/entities/answers'

export class AnswerMapper extends BaseMapper<AnswerFromModel, AnswerToModel, AnswerEntity> {
	mapFrom (model: AnswerFromModel | null) {
		if (!model) return null
		const {
			_id, title, body, questionId, attachments,
			userId, userBio, best, votes, commentsCount,
			createdAt, updatedAt
		} = model
		return new AnswerEntity({
			id: _id.toString(), title, body, questionId,
			userId, userBio, best, votes, commentsCount, attachments,
			createdAt, updatedAt
		})
	}

	mapTo (entity: AnswerEntity) {
		return {
			title: entity.title,
			body: entity.body,
			attachments: entity.attachments,
			questionId: entity.questionId,
			userId: entity.userId,
			userBio: entity.userBio
		}
	}
}
