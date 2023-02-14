import { FilesUseCases } from '@modules/study'
import { UsersUseCases } from '@modules/users'
import { BadRequestError, NotAuthorizedError, QueryParams, Request, validate, Validation } from '@utils/app/package'
import { UploaderUseCases } from '@modules/storage'

export class FileController {
	static async FindFile (req: Request) {
		return await FilesUseCases.find(req.params.id)
	}

	static async GetFile (req: Request) {
		const query = req.query as QueryParams
		query.auth = [{ field: 'user.id', value: req.authUser?.id ?? '' }]
		return await FilesUseCases.get(query)
	}

	static async UpdateFile (req: Request) {
		const authUserId = req.authUser!.id
		const uploadedMedia = req.files.media?.[0] ?? null
		const changedPhoto = !!uploadedMedia || req.body.photo === null
		const data = validate({
			title: req.body.title,
			media: uploadedMedia as any
		}, {
			title: { required: true, rules: [Validation.isString(), Validation.isMinOf(1)] },
			media: { required: true, nullable: true, rules: [Validation.isFile()] }
		})

		const { title } = data
		if (uploadedMedia) data.media = await UploaderUseCases.upload('study/files', uploadedMedia)
		const validateData = {
			title,
			...(changedPhoto ? { media: data.media } : {})
		}

		const updatedFile = await FilesUseCases.update({
			id: req.params.id, userId: authUserId, data: validateData
		})

		if (updatedFile) return updatedFile
		throw new NotAuthorizedError()
	}

	static async CreateFile (req: Request) {
		const data = validate({
			title: req.body.title,
			media: req.files.media?.[0] ?? null
		}, {
			title: { required: true, rules: [Validation.isString(), Validation.isMinOf(1)] },
			media: { required: true, rules: [Validation.isFile()] }
		})

		const user = await UsersUseCases.find(req.authUser!.id)
		if (!user || user.isDeleted()) throw new BadRequestError('user not found')
		const media = await UploaderUseCases.upload('study/files', data.media)
		return await FilesUseCases.add({
			...data, media, user: user.getEmbedded()
		})
	}

	static async DeleteFile (req: Request) {
		const authUserId = req.authUser!.id
		const isDeleted = await FilesUseCases.delete({ id: req.params.id, userId: authUserId })
		if (isDeleted) return isDeleted
		throw new NotAuthorizedError()
	}
}