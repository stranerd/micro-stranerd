import { TestFromModel, TestToModel } from '../models/tests'
import { TestEntity } from '../../domain/entities/tests'
import { BaseMapper } from '@utils/app/package'

export class TestMapper extends BaseMapper<TestFromModel, TestToModel, TestEntity> {
	mapFrom (model: TestFromModel | null) {
		if (!model) return null
		const {
			_id,
			name,
			userId,
			prepId,
			questionType,
			questions,
			answers,
			score,
			done,
			taskIds,
			data,
			createdAt,
			updatedAt
		} = model
		return new TestEntity({
			id: _id.toString(),
			name,
			userId,
			prepId,
			questionType,
			questions,
			answers,
			score,
			done,
			taskIds,
			data,
			createdAt,
			updatedAt
		})
	}

	mapTo (entity: TestEntity) {
		return {
			name: entity.name,
			userId: entity.userId,
			prepId: entity.prepId,
			questionType: entity.questionType,
			questions: entity.questions,
			answers: entity.answers,
			data: entity.data,
			done: entity.done,
			score: entity.score
		}
	}
}
