import { timestampToMs } from '@utils/commons'
import { QuestionFromModel, QuestionToModel } from '../models'
import { QuestionEntity } from '../../domain/entities/question'
import { BaseMapper } from '@stranerd/api-commons'

export class QuestionMapper extends BaseMapper<QuestionFromModel, QuestionToModel,QuestionEntity> {

	mapFrom (model: QuestionFromModel) {
		const {
			_id: id, body, coins, subjectId, tags,
			answerId, userId, user, comments, answers,
			dates: { createdAt }
		} = model
		return new QuestionEntity({
			id, body, coins, subjectId, tags,
			answerId, userId, user, comments, answers,
			createdAt: timestampToMs(createdAt)
		})
	}

	mapTo (entity: QuestionEntity): QuestionToModel {
		return {
			body: entity.body,
			coins: entity.coins,
			tags: entity.tags,
			subjectId: entity.subjectId,
			answerId: {
				first: entity.answerId.first,
				second: entity.answerId.second
			},
			userId: entity.userId,
			user: entity.user
		}
	}
}
