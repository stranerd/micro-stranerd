import { AssignmentFromModel, AssignmentToModel } from '../models/assignments'
import { AssignmentEntity } from '../../domain/entities/assignments'
import { BaseMapper } from '@utils/app/package'

export class AssignmentMapper extends BaseMapper<AssignmentFromModel, AssignmentToModel, AssignmentEntity> {
	mapFrom (model: AssignmentFromModel | null) {
		if (!model) return null
		const {
			_id, courseId, members, title, description, user,
			attachments, submissions, deadline, createdAt, updatedAt
		} = model
		return new AssignmentEntity({
			id: _id.toString(),
			courseId, members, title, description, user, attachments,
			submissions, deadline, createdAt, updatedAt
		})
	}

	mapTo (entity: AssignmentEntity) {
		return {
			courseId: entity.courseId,
			members: entity.members,
			title: entity.title,
			description: entity.description,
			user: entity.user,
			attachments: entity.attachments,
			deadline: entity.deadline
		}
	}
}
