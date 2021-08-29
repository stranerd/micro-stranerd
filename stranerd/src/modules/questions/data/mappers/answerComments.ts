import { AnswerCommentFromModel, AnswerCommentToModel } from '../models'
import { AnswerCommentEntity } from '../../domain/entities'
import { BaseMapper } from '@utils/commons'

export class AnswerCommentMapper extends BaseMapper<AnswerCommentFromModel, AnswerCommentToModel, AnswerCommentEntity> {
	mapFrom (model: AnswerCommentFromModel) {
		const {
			_id: id, body, userId, userBio, answerId,
			createdAt, updatedAt
		} = model
		return new AnswerCommentEntity({
			id, body, userId, userBio, answerId,
			createdAt, updatedAt
		})
	}

	mapTo (entity: AnswerCommentEntity): AnswerCommentToModel {
		return {
			body: entity.body,
			userId: entity.userId,
			userBio: entity.userBio,
			answerId: entity.answerId
		}
	}
}
