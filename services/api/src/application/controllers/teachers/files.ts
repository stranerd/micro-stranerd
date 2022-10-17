import { CoursesUseCases, FilesUseCases } from '@modules/teachers'
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

export class FileController {
	static async FindFile (req: Request) {
		const file = await FilesUseCases.find(req.params.id)
		if (!file || file.courseId !== req.params.courseId || !file.members.includes(req.authUser!.id)) return null
		return file
	}

	static async GetFile (req: Request) {
		const query = req.query as QueryParams
		query.authType = QueryKeys.and
		query.auth = [{ field: 'courseId', value: req.params.courseId },
			{ field: 'members', value: req.authUser!.id }]
		return await FilesUseCases.get(query)
	}

	static async UpdateFile (req: Request) {
		const authUserId = req.authUser!.id
		const uploadedMedia = req.files.media?.[0] ?? null
		const changedMedia = !!uploadedMedia || req.body.photo === null

		const data = validate({
			title: req.body.title,
			media: uploadedMedia as any
		}, {
			title: { required: true, rules: [Validation.isString, Validation.isLongerThanX(0)] },
			media: { required: true, nullable: true, rules: [Validation.isFile, Validation.isNotTruncated] }
		})

		if (uploadedMedia) data.media = await UploaderUseCases.upload('teachers/files', uploadedMedia)
		const validateData = {
			title: data.title,
			...(changedMedia ? { media: data.media } : {})
		}

		const updatedFile = await FilesUseCases.update({ id: req.params.id, userId: authUserId, data: validateData })

		if (updatedFile) return updatedFile
		throw new NotAuthorizedError()
	}

	static async CreateFile (req: Request) {
		const { title, courseId, media: fileMedia } = validate({
			title: req.body.title,
			courseId: req.params.courseId,
			media: req.files.media?.[0] ?? null
		}, {
			title: { required: true, rules: [Validation.isString, Validation.isLongerThanX(0)] },
			courseId: { required: true, rules: [Validation.isString] },
			media: { required: true, rules: [Validation.isFile, Validation.isNotTruncated] }
		})

		const userId = req.authUser!.id
		const course = await CoursesUseCases.find(courseId)
		if (!course || course.user.id !== userId) throw new NotAuthorizedError()

		const user = await UsersUseCases.find(userId)
		if (!user) throw new BadRequestError('user not found')
		const media = await UploaderUseCases.upload('teachers/files', fileMedia)

		return await FilesUseCases.add({
			courseId: course.id, members: course.members,
			title, user: user.getEmbedded(), media
		})
	}

	static async DeleteFile (req: Request) {
		const authUserId = req.authUser!.id
		const isDeleted = await FilesUseCases.delete({ id: req.params.id, userId: authUserId })
		if (isDeleted) return isDeleted
		throw new NotAuthorizedError()
	}
}