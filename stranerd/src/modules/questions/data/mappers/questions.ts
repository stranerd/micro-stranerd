import { QuestionFromModel, QuestionToModel } from '../models/questions'
import { QuestionEntity } from '../../domain/entities/questions'
import { BaseMapper } from '@utils/commons'

export class QuestionMapper extends BaseMapper<QuestionFromModel, QuestionToModel, QuestionEntity> {
	mapFrom (model: QuestionFromModel | null) {
		if (!model) return null
		const {
			_id, body, coins, subjectId, tags, attachments,
			bestAnswers, userId, userBio, commentsCount, answers,
			createdAt, updatedAt
		} = model
		return new QuestionEntity({
			id: _id.toString(), body, coins, subjectId, tags, attachments,
			bestAnswers, userId, userBio, commentsCount, answers,
			createdAt, updatedAt
		})
	}

	mapTo (entity: QuestionEntity) {
		return {
			body: entity.body,
			coins: entity.coins,
			attachments: entity.attachments,
			tags: entity.tags,
			subjectId: entity.subjectId,
			userId: entity.userId,
			userBio: entity.userBio
		}
	}
}
