import { TestPrepFromModel, TestPrepToModel } from '../models/testPreps'
import { TestPrepEntity } from '../../domain/entities/testPreps'
import { BaseMapper } from '@utils/app/package'

export class TestPrepMapper extends BaseMapper<TestPrepFromModel, TestPrepToModel, TestPrepEntity> {
	mapFrom (model: TestPrepFromModel | null) {
		if (!model) return null
		const { _id, name, questions, time, data, createdAt, updatedAt } = model
		return new TestPrepEntity({
			id: _id.toString(), name, questions, time, data, createdAt, updatedAt
		})
	}

	mapTo (entity: TestPrepEntity) {
		return {
			name: entity.name,
			questions: entity.questions,
			time: entity.time,
			data: entity.data
		}
	}
}
