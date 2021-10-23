import {
	PastQuestionObjFromModel,
	PastQuestionObjToModel,
	PastQuestionTheoryFromModel,
	PastQuestionTheoryToModel
} from '../models/pastQuestions'
import { PastQuestionObjEntity, PastQuestionTheoryEntity } from '../../domain/entities/pastQuestions'
import { BaseMapper } from '@utils/commons'

export class PastQuestionTheoryMapper extends BaseMapper<PastQuestionTheoryFromModel, PastQuestionTheoryToModel, PastQuestionTheoryEntity> {
	mapFrom (model: PastQuestionTheoryFromModel | null) {
		if (!model) return null
		const {
			_id, order, year, question, questionMedia, institutionId, courseId,
			answerMedia, answer,
			createdAt, updatedAt
		} = model
		return new PastQuestionTheoryEntity({
			id: _id.toString(), order, year,
			question, questionMedia, institutionId, courseId,
			answerMedia, answer,
			createdAt, updatedAt
		})
	}

	mapTo (entity: PastQuestionTheoryEntity) {
		return {
			order: entity.order,
			year: entity.year,
			institutionId: entity.institutionId,
			courseId: entity.courseId,
			questionMedia: entity.questionMedia,
			question: entity.question,
			answerMedia: entity.answerMedia,
			answer: entity.answer
		}
	}
}

export class PastQuestionObjMapper extends BaseMapper<PastQuestionObjFromModel, PastQuestionObjToModel, PastQuestionObjEntity> {
	mapFrom (model: PastQuestionObjFromModel | null) {
		if (!model) return null
		const {
			_id, order, year, question, questionMedia, institutionId, courseId,
			answer,
			createdAt, updatedAt
		} = model
		return new PastQuestionObjEntity({
			id: _id.toString(), order, year,
			question, questionMedia, institutionId, courseId,
			answer,
			createdAt, updatedAt
		})
	}

	mapTo (entity: PastQuestionObjEntity) {
		return {
			order: entity.order,
			year: entity.year,
			institutionId: entity.institutionId,
			courseId: entity.courseId,
			questionMedia: entity.questionMedia,
			question: entity.question,
			answer: entity.answer
		}
	}
}