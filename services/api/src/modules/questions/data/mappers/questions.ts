import { QuestionFromModel, QuestionToModel } from '../models/questions'
import { QuestionEntity } from '../../domain/entities/questions'
import { BaseMapper } from '@utils/commons'

export class QuestionMapper extends BaseMapper<QuestionFromModel, QuestionToModel, QuestionEntity> {
	mapFrom (model: QuestionFromModel | null) {
		if (!model) return null
		const {
			_id, body, subject, attachments,
			bestAnswers, userId, userBio, userRoles, data, answers,
			createdAt, updatedAt
		} = model
		return new QuestionEntity({
			id: _id.toString(), body, subject, attachments,
			bestAnswers, userId, userBio, userRoles, data, answers,
			createdAt, updatedAt
		})
	}

	mapTo (entity: QuestionEntity) {
		return {
			body: entity.body,
			attachments: entity.attachments,
			subject: entity.subject,
			userId: entity.userId,
			userBio: entity.userBio,
			userRoles: entity.userRoles,
			data: entity.data
		}
	}
}