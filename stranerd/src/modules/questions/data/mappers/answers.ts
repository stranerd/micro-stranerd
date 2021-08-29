import { BaseMapper } from '@utils/commons'
import { AnswerFromModel, AnswerToModel } from '../models'
import { AnswerEntity } from '../../domain/entities/answers'

export class AnswerMapper extends BaseMapper<AnswerFromModel, AnswerToModel, AnswerEntity> {
	mapFrom (model: AnswerFromModel) {
		const {
			_id: id, title, body, coins, questionId,
			userId, userBio, best, ratings, commentsCount,
			createdAt, updatedAt
		} = model
		return new AnswerEntity({
			id, title, body, coins, questionId,
			userId, userBio, best, ratings, commentsCount,
			createdAt, updatedAt
		})
	}

	mapTo (entity: AnswerEntity): AnswerToModel {
		return {
			title: entity.title,
			body: entity.body,
			coins: entity.coins,
			questionId: entity.questionId,
			userId: entity.userId,
			userBio: entity.userBio
		}
	}
}
