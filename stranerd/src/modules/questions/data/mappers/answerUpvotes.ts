import { AnswerUpvoteFromModel, AnswerUpvoteToModel } from '../models'
import { AnswerUpvoteEntity } from '../../domain/entities'
import { BaseMapper } from '@utils/commons'

export class AnswerUpvoteMapper extends BaseMapper<AnswerUpvoteFromModel, AnswerUpvoteToModel, AnswerUpvoteEntity> {
	mapFrom (model) {
		if (!model) return null
		const {
			_id: id, vote, userId, answerId,
			createdAt, updatedAt
		} = model
		return new AnswerUpvoteEntity({
			id, vote, userId, answerId,
			createdAt, updatedAt
		})
	}

	mapTo (entity) {
		return {
			vote: entity.vote,
			userId: entity.userId,
			answerId: entity.answerId
		}
	}
}
