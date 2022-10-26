import { AssignmentsUseCases, CoursesUseCases } from '@modules/teachers'
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

export class AssignmentController {
	static async FindAssignment (req: Request) {
		const assignment = await AssignmentsUseCases.find(req.params.id)
		if (!assignment || assignment.courseId !== req.params.courseId || !assignment.members.includes(req.authUser!.id)) return null
		return assignment
	}

	static async GetAssignment (req: Request) {
		const query = req.query as QueryParams
		query.authType = QueryKeys.and
		query.auth = [{ field: 'courseId', value: req.params.courseId },
			{ field: 'members', value: req.authUser!.id }]
		return await AssignmentsUseCases.get(query)
	}

	static async CreateAssignment (req: Request) {
		const { title, courseId, description, deadline, attachments: attachmentFiles } = validate({
			title: req.body.title,
			description: req.body.description,
			deadline: req.body.deadline,
			courseId: req.params.courseId,
			attachments: req.files.attachments ?? []
		}, {
			title: { required: true, rules: [Validation.isString, Validation.isLongerThanX(0)] },
			description: { required: true, rules: [Validation.isString, Validation.isLongerThanX(0)] },
			deadline: { required: true, nullable: true, rules: [Validation.isNumber, Validation.isMoreThanX(0)] },
			courseId: { required: true, rules: [Validation.isString] },
			attachments: {
				required: true,
				rules: [Validation.isArrayOfX((cur) => Validation.isImage(cur).valid, 'images'), Validation.hasLessThanX(6)]
			}
		})

		const userId = req.authUser!.id
		const course = await CoursesUseCases.find(courseId)
		if (!course || course.user.id !== userId) throw new NotAuthorizedError()

		const user = await UsersUseCases.find(userId)
		if (!user || user.isDeleted()) throw new BadRequestError('user not found')

		const attachments = await UploaderUseCases.uploadMany('teachers/assignments', attachmentFiles)

		return await AssignmentsUseCases.add({
			courseId: course.id, members: course.members,
			title, description, attachments, deadline, user: user.getEmbedded()
		})
	}

	static async DeleteAssignment (req: Request) {
		const authUserId = req.authUser!.id
		const isDeleted = await AssignmentsUseCases.delete({
			courseId: req.params.courseId,
			id: req.params.id,
			userId: authUserId
		})
		if (isDeleted) return isDeleted
		throw new NotAuthorizedError()
	}
}