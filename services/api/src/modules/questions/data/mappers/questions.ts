import { QuestionFromModel, QuestionToModel } from '../models/questions'
import { QuestionEntity } from '../../domain/entities/questions'
import { BaseMapper } from '@utils/commons'

export class QuestionMapper extends BaseMapper<QuestionFromModel, QuestionToModel, QuestionEntity> {
	mapFrom (model: QuestionFromModel | null) {
		if (!model) return null
		const {
			_id, body, tagId, attachments,
			bestAnswers, user, answers,
			createdAt, updatedAt
		} = model
		return new QuestionEntity({
			id: _id.toString(), body, tagId, attachments,
			bestAnswers, user, answers,
			createdAt, updatedAt
		})
	}

	mapTo (entity: QuestionEntity) {
		return {
			body: entity.body,
			attachments: entity.attachments,
			tagId: entity.tagId,
			user: entity.user
		}
	}
}
