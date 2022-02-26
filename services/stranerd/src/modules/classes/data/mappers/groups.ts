import { GroupFromModel, GroupToModel } from '../models/groups'
import { GroupEntity } from '../../domain/entities/groups'
import { BaseMapper } from '@utils/commons'

export class GroupMapper extends BaseMapper<GroupFromModel, GroupToModel, GroupEntity> {
	mapFrom (model: GroupFromModel | null) {
		if (!model) return null
		const { _id, name, classId, admins, createdAt, updatedAt } = model
		return new GroupEntity({
			id: _id.toString(), name, classId, admins, createdAt, updatedAt
		})
	}

	mapTo (entity: GroupEntity) {
		return {
			name: entity.name,
			classId: entity.classId
		}
	}
}
