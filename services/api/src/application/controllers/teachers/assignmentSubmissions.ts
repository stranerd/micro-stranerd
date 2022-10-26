import { AssignmentSubmissionsUseCases, AssignmentsUseCases } from '@modules/teachers'
import { UsersUseCases } from '@modules/users'
import {
	BadRequestError,
	NotAuthorizedError,
	QueryKeys,
	QueryParams,
	Request,
	validate,
	Validation
} from '@utils/app/package'
import { UploaderUseCases } from '@modules/storage'

export class AssignmentSubmissionController {
	static async FindAssignmentSubmission (req: Request) {
		const assignmentSubmission = await AssignmentSubmissionsUseCases.find(req.params.id)
		if (!assignmentSubmission || assignmentSubmission.courseId !== req.params.courseId || !assignmentSubmission.members.includes(req.authUser!.id)) return null
		return assignmentSubmission
	}

	static async GetAssignmentSubmission (req: Request) {
		const query = req.query as QueryParams
		query.authType = QueryKeys.and
		query.auth = [{ field: 'courseId', value: req.params.courseId },
			{ field: 'members', value: req.authUser!.id }]
		return await AssignmentSubmissionsUseCases.get(query)
	}

	static async SubmitAssignment (req: Request) {
		const { assignmentId, attachments: attachmentFiles } = validate({
			assignmentId: req.params.assignmentId,
			attachments: req.files.attachments ?? []
		}, {
			assignmentId: { required: true, rules: [Validation.isString] },
			attachments: {
				required: true,
				rules: [Validation.isArrayOfX((cur) => Validation.isImage(cur).valid, 'images'), Validation.hasLessThanX(6)]
			}
		})

		const userId = req.authUser!.id
		const assignment = await AssignmentsUseCases.find(assignmentId)
		if (!assignment || !assignment.members.includes(userId)) throw new NotAuthorizedError()

		const user = await UsersUseCases.find(userId)
		if (!user || user.isDeleted()) throw new BadRequestError('user not found')

		const attachments = await UploaderUseCases.uploadMany(`teachers/assignments/${assignmentId}/submissions`, attachmentFiles)

		return await AssignmentSubmissionsUseCases.submit({
			assignmentId, attachments, user: user.getEmbedded()
		})
	}

	static async DeleteAssignmentSubmission (req: Request) {
		const authUserId = req.authUser!.id
		const isDeleted = await AssignmentSubmissionsUseCases.delete({
			courseId: req.params.courseId,
			id: req.params.id,
			userId: authUserId
		})
		if (isDeleted) return isDeleted
		throw new NotAuthorizedError()
	}
}