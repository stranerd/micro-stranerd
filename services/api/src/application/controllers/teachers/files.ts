import { UploaderUseCases } from '@modules/storage'
import { CoursesUseCases, FilesUseCases } from '@modules/teachers'
import { UsersUseCases } from '@modules/users'
import {
	BadRequestError, NotAuthorizedError,
	QueryKeys,
	QueryParams,
	Request,
	Schema, validateReq
} from '@utils/app/package'

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

	static async UpdateFile(req: Request) {
		const authUserId = req.authUser!.id
		const uploadedMedia = req.files.media?.[0] ?? null
		const changedMedia = !!uploadedMedia || req.body.photo === null

		const data = validateReq({
			title: Schema.string().min(1),
			media: Schema.file().nullable()
		}, { ...req.body, media: uploadedMedia })

		const media = uploadedMedia ? await UploaderUseCases.upload('teachers/files', uploadedMedia) : undefined

		const updatedFile = await FilesUseCases.update({
			courseId: req.params.courseId,
			id: req.params.id,
			userId: authUserId,
			data: {
				title: data.title, ...(changedMedia ? { media } : {})
			}
		})

		if (updatedFile) return updatedFile
		throw new NotAuthorizedError()
	}

	static async CreateFile (req: Request) {
		const { title, courseId, media: fileMedia } = validateReq({
			title: Schema.string().min(1),
			courseId: Schema.string().min(1),
			media: Schema.file()
		}, {
			...req.body,
			courseId: req.params.courseId,
			media: req.files.media?.[0] ?? null
		})

		const userId = req.authUser!.id
		const course = await CoursesUseCases.find(courseId)
		if (!course || course.user.id !== userId) throw new NotAuthorizedError()

		const user = await UsersUseCases.find(userId)
		if (!user || user.isDeleted()) throw new BadRequestError('user not found')
		const media = await UploaderUseCases.upload('teachers/files', fileMedia)

		return await FilesUseCases.add({
			courseId: course.id, members: course.members,
			title, user: user.getEmbedded(), media
		})
	}

	static async DeleteFile (req: Request) {
		const authUserId = req.authUser!.id
		const isDeleted = await FilesUseCases.delete({
			courseId: req.params.courseId,
			id: req.params.id,
			userId: authUserId
		})
		if (isDeleted) return isDeleted
		throw new NotAuthorizedError()
	}
}