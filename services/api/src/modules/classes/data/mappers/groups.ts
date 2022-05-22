import { GroupFromModel, GroupToModel } from '../models/groups'
import { GroupEntity } from '../../domain/entities/groups'
import { BaseMapper } from '@utils/commons'
import { DiscussionMapper } from './discussions'

export class GroupMapper extends BaseMapper<GroupFromModel, GroupToModel, GroupEntity> {
	mapFrom (model: GroupFromModel | null) {
		if (!model) return null
		const { _id, name, last, classId, user, users, readAt, createdAt, updatedAt } = model
		const lastData = new DiscussionMapper().mapFrom(last)
		return new GroupEntity({
			id: _id.toString(), name, last: lastData, classId, user, users, readAt, createdAt, updatedAt
		})
	}

	mapTo (entity: GroupEntity) {
		return {
			name: entity.name,
			classId: entity.classId,
			users: entity.users,
			user: entity.user
		}
	}
}
