import { FilesUseCases } from '@modules/study'
import { UsersUseCases } from '@modules/users'
import {
	BadRequestError,
	NotAuthorizedError,
	QueryKeys,
	QueryParams,
	Request,
	validate,
	Validation
} from '@utils/commons'
import { UploaderUseCases } from '@modules/storage'

export class FileController {
	static async FindFile (req: Request) {
		return await FilesUseCases.find(req.params.id)
	}

	static async GetFile (req: Request) {
		const query = req.query as QueryParams
		query.auth = [{ field: 'isPrivate', value: true }]
		if (req.authUser) {
			query.authType = QueryKeys.or
			query.auth.push({ field: 'user.id', value: req.authUser!.id })
		}
		return await FilesUseCases.get(query)
	}

	static async UpdateFile (req: Request) {
		const uploadedMedia = req.files.media?.[0] ?? null
		const changedMedia = !!uploadedMedia || req.body.media === null
		const data = validate({
			title: req.body.title,
			content: req.body.content,
			isPrivate: req.body.isPrivate,
			media: uploadedMedia as any
		}, {
			title: { required: true, rules: [Validation.isString, Validation.isLongerThanX(0)] },
			content: { required: true, rules: [Validation.isString] },
			isPrivate: { required: true, rules: [Validation.isBoolean] },
			media: { required: true, nullable: true, rules: [Validation.isNotTruncated, Validation.isFile] }
		})
		if (uploadedMedia) data.media = await UploaderUseCases.upload('study/files', uploadedMedia)
		const { title, content, isPrivate, media } = data
		const validateData = {
			title, content, isPrivate, links: Validation.extractUrls(content),
			...(changedMedia ? { media } : {})
		}

		const authUserId = req.authUser!.id

		const updatedFile = await FilesUseCases.update({ id: req.params.id, userId: authUserId, data: validateData })

		if (updatedFile) return updatedFile
		throw new NotAuthorizedError()
	}

	static async CreateFile (req: Request) {
		const data = validate({
			title: req.body.title,
			content: req.body.content,
			isPrivate: req.body.isPrivate,
			media: req.files.media?.[0] ?? null
		}, {
			title: { required: true, rules: [Validation.isString, Validation.isLongerThanX(0)] },
			content: { required: true, rules: [Validation.isString] },
			isPrivate: { required: true, rules: [Validation.isBoolean] },
			media: { required: true, nullable: true, rules: [Validation.isNotTruncated, Validation.isFile] }
		})

		const media = data.media ? await UploaderUseCases.upload('study/files', data.media) : null
		const user = await UsersUseCases.find(req.authUser!.id)
		if (!user) throw new BadRequestError('user not found')
		return await FilesUseCases.add({
			...data, media, user: user.getEmbedded(),
			links: Validation.extractUrls(data.content)
		})
	}

	static async DeleteFile (req: Request) {
		const authUserId = req.authUser!.id
		const isDeleted = await FilesUseCases.delete({ id: req.params.id, userId: authUserId })
		if (isDeleted) return isDeleted
		throw new NotAuthorizedError()
	}
}