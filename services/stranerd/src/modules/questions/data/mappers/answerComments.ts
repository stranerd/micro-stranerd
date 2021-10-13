import { AnswerCommentFromModel, AnswerCommentToModel } from '../models/answerComments'
import { AnswerCommentEntity } from '../../domain/entities/answerComments'
import { BaseMapper } from '@utils/commons'

export class AnswerCommentMapper extends BaseMapper<AnswerCommentFromModel, AnswerCommentToModel, AnswerCommentEntity> {
	mapFrom (model: AnswerCommentFromModel | null) {
		if (!model) return null
		const {
			_id, body, userId, userBio, answerId,
			createdAt, updatedAt
		} = model
		return new AnswerCommentEntity({
			id: _id.toString(), body, userId, userBio, answerId,
			createdAt, updatedAt
		})
	}

	mapTo (entity: AnswerCommentEntity) {
		return {
			body: entity.body,
			userId: entity.userId,
			userBio: entity.userBio,
			answerId: entity.answerId
		}
	}
}