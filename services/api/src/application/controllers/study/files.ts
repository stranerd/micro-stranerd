import { UploaderUseCases } from '@modules/storage'
import { FilesUseCases } from '@modules/study'
import { UsersUseCases } from '@modules/users'
import { BadRequestError, NotAuthorizedError, QueryParams, Request, Schema, validateReq } from '@utils/app/package'

export class FileController {
	static async FindFile(req: Request) {
		return await FilesUseCases.find(req.params.id)
	}

	static async GetFile(req: Request) {
		const query = req.query as QueryParams
		query.auth = [{ field: 'user.id', value: req.authUser?.id ?? '' }]
		return await FilesUseCases.get(query)
	}

	static async UpdateFile(req: Request) {
		const authUserId = req.authUser!.id
		const uploadedMedia = req.files.media?.[0] ?? null
		const changedMedia = !!uploadedMedia || req.body.media === null

		const data = validateReq({
			title: Schema.string().min(1),
			media: Schema.file().nullable()
		}, { ...req.body, media: uploadedMedia })

		const { title } = data
		const media = uploadedMedia ? await UploaderUseCases.upload('study/files', uploadedMedia) : undefined

		const updatedFile = await FilesUseCases.update({
			id: req.params.id, userId: authUserId, data: {
				title,
				...(changedMedia ? { media } : {})
			}
		})

		if (updatedFile) return updatedFile
		throw new NotAuthorizedError()
	}

	static async CreateFile(req: Request) {
		const data = validateReq({
			title: Schema.string().min(1),
			media: Schema.file()
		}, { ...req.body, media: req.files.media?.[0] ?? null })

		const user = await UsersUseCases.find(req.authUser!.id)
		if (!user || user.isDeleted()) throw new BadRequestError('user not found')
		const media = await UploaderUseCases.upload('study/files', data.media)
		return await FilesUseCases.add({
			...data, media, user: user.getEmbedded()
		})
	}

	static async DeleteFile(req: Request) {
		const authUserId = req.authUser!.id
		const isDeleted = await FilesUseCases.delete({ id: req.params.id, userId: authUserId })
		if (isDeleted) return isDeleted
		throw new NotAuthorizedError()
	}
}