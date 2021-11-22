import { PastQuestionFromModel, PastQuestionToModel } from '../models/pastQuestions'
import { PastQuestionEntity } from '../../domain/entities/pastQuestions'
import { BaseMapper } from '@utils/commons'

export class PastQuestionMapper extends BaseMapper<PastQuestionFromModel, PastQuestionToModel, PastQuestionEntity> {
	mapFrom (model: PastQuestionFromModel | null) {
		if (!model) return null
		const {
			_id, year, question, questionMedia, institutionId, courseId,
			data, createdAt, updatedAt
		} = model
		return new PastQuestionEntity({
			id: _id.toString(), year,
			question, questionMedia, institutionId, courseId,
			data, createdAt, updatedAt
		})
	}

	mapTo (entity: PastQuestionEntity) {
		return {
			year: entity.year,
			institutionId: entity.institutionId,
			courseId: entity.courseId,
			questionMedia: entity.questionMedia,
			question: entity.question,
			data: entity.data
		}
	}
}