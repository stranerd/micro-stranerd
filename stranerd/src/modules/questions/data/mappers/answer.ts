import { BaseMapper } from '@stranerd/api-commons'
import { AnswerFromModel, AnswerToModel } from '../models'
import { AnswerEntity } from '../../domain/entities/answer'
import { timestampToMs } from '@utils/commons'

export class AnswerMapper extends BaseMapper<AnswerFromModel, AnswerToModel, AnswerEntity>  {

	mapFrom (model: AnswerFromModel) {
		const {
			_id: id, title, body, coins, questionId, subjectId, tags,
			userId, user, best, ratings, comments,
			dates: { createdAt }
		} = model
		return new AnswerEntity({
			id, title, body, coins, tags,
			questionId, userId, user, subjectId,
			best, ratings, comments,
			createdAt: timestampToMs(createdAt)
		})
	}

	mapTo (entity: AnswerEntity): AnswerToModel {
		return {
			title: entity.title,
			body: entity.body,
			coins: entity.coins,
			tags: entity.tags,
			questionId: entity.questionId,
			subjectId: entity.subjectId,
			userId: entity.userId,
			user: entity.user
		}
	}
}
