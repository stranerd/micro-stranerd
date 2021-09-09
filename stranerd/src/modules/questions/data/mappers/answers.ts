import { BaseMapper } from '@utils/commons'
import { AnswerFromModel, AnswerToModel } from '../models'
import { AnswerEntity } from '../../domain/entities/answers'

export class AnswerMapper extends BaseMapper<AnswerFromModel, AnswerToModel, AnswerEntity> {
	mapFrom (model: AnswerFromModel | null) {
		if (!model) return null
		const {
			_id, title, body, coins, questionId, tags,
			userId, userBio, best, votes, commentsCount,
			createdAt, updatedAt
		} = model
		return new AnswerEntity({
			id: _id.toString(), title, body, coins, questionId,
			userId, userBio, best, votes, commentsCount, tags,
			createdAt, updatedAt
		})
	}

	mapTo (entity: AnswerEntity) {
		return {
			title: entity.title,
			body: entity.body,
			coins: entity.coins,
			tags: entity.tags,
			questionId: entity.questionId,
			userId: entity.userId,
			userBio: entity.userBio
		}
	}
}
