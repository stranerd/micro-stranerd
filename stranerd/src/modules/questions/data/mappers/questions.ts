import { QuestionFromModel, QuestionToModel } from '../models'
import { QuestionEntity } from '../../domain/entities/questions'
import { BaseMapper } from '@utils/commons'

export class QuestionMapper extends BaseMapper<QuestionFromModel, QuestionToModel, QuestionEntity> {
	mapFrom (model: QuestionFromModel) {
		const {
			_id: id, body, coins, subjectId, tags,
			bestAnswers, userId, userBio, commentsCount, answersCount,
			createdAt, updatedAt
		} = model
		return new QuestionEntity({
			id, body, coins, subjectId, tags,
			bestAnswers, userId, userBio, commentsCount, answersCount,
			createdAt, updatedAt
		})
	}

	mapTo (entity: QuestionEntity): QuestionToModel {
		return {
			body: entity.body,
			coins: entity.coins,
			tags: entity.tags,
			subjectId: entity.subjectId,
			userId: entity.userId,
			userBio: entity.userBio
		}
	}
}
