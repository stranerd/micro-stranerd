import { AnswerUpvoteFromModel, AnswerUpvoteToModel } from '../models/answerUpvotes'
import { AnswerUpvoteEntity } from '../../domain/entities/answerUpvotes'
import { BaseMapper } from '@utils/commons'

export class AnswerUpvoteMapper extends BaseMapper<AnswerUpvoteFromModel, AnswerUpvoteToModel, AnswerUpvoteEntity> {
	mapFrom (model: AnswerUpvoteFromModel | null) {
		if (!model) return null
		const {
			_id, vote, userId, answerId,
			createdAt, updatedAt
		} = model
		return new AnswerUpvoteEntity({
			id: _id.toString(), vote, userId, answerId,
			createdAt, updatedAt
		})
	}

	mapTo (entity: AnswerUpvoteEntity) {
		return {
			vote: entity.vote,
			userId: entity.userId,
			answerId: entity.answerId
		}
	}
}
