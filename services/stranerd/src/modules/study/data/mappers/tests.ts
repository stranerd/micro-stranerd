import { TestFromModel, TestToModel } from '../models/tests'
import { TestEntity } from '../../domain/entities/tests'
import { BaseMapper } from '@utils/commons'

export class TestMapper extends BaseMapper<TestFromModel, TestToModel, TestEntity> {
	mapFrom (model: TestFromModel | null) {
		if (!model) return null
		const { _id, userId, questions, answers, score, done, taskIds, data, createdAt, updatedAt } = model
		return new TestEntity({
			id: _id.toString(), userId, questions, answers, score, done, taskIds, data, createdAt, updatedAt
		})
	}

	mapTo (entity: TestEntity) {
		return {
			userId: entity.userId,
			questions: entity.questions,
			answers: entity.answers,
			data: entity.data,
			done: entity.done,
			score: entity.score
		}
	}
}
