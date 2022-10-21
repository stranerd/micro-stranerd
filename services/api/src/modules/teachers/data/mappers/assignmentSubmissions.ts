import { AssignmentSubmissionFromModel, AssignmentSubmissionToModel } from '../models/assignmentSubmissions'
import { AssignmentSubmissionEntity } from '../../domain/entities/assignmentSubmissions'
import { BaseMapper } from '@utils/app/package'

export class AssignmentSubmissionMapper extends BaseMapper<AssignmentSubmissionFromModel, AssignmentSubmissionToModel, AssignmentSubmissionEntity> {
	mapFrom (model: AssignmentSubmissionFromModel | null) {
		if (!model) return null
		const { _id, courseId, assignmentId, members, user, attachments, createdAt, updatedAt } = model
		return new AssignmentSubmissionEntity({
			id: _id.toString(), courseId, assignmentId, members, user, attachments, createdAt, updatedAt
		})
	}

	mapTo (entity: AssignmentSubmissionEntity) {
		return {
			courseId: entity.courseId,
			assignmentId: entity.assignmentId,
			members: entity.members,
			user: entity.user,
			attachments: entity.attachments
		}
	}
}
