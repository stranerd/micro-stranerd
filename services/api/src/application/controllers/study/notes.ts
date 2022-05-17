import { NotesUseCases } from '@modules/study'
import { UsersUseCases } from '@modules/users'
import { BadRequestError, NotAuthorizedError, QueryParams, Request, validate, Validation } from '@utils/commons'
import { UploaderUseCases } from '@modules/storage'

const isPdf = (file: any) => {
	const isValid = Validation.isFile(file).valid && file.type === 'application/pdf'
	return isValid ? Validation.isValid() : Validation.isInvalid('only pdf files are supported')
}

export class NoteController {
	static async FindNote (req: Request) {
		return await NotesUseCases.find(req.params.id)
	}

	static async GetNote (req: Request) {
		const query = req.query as QueryParams
		return await NotesUseCases.get(query)
	}

	static async UpdateNote (req: Request) {
		const uploadedMedia = req.files.media?.[0]
		const changedMedia = !!uploadedMedia || req.body.media === null
		const data = validate({
			title: req.body.title,
			description: req.body.description,
			isHosted: req.body.isHosted,
			link: req.body.link,
			media: uploadedMedia as any
		}, {
			title: { required: true, rules: [Validation.isString, Validation.isLongerThanX(2)] },
			description: { required: true, rules: [Validation.isString] },
			isHosted: { required: false, rules: [Validation.isBoolean] },
			link: { required: !req.body.isHosted, rules: [Validation.isString] },
			media: {
				required: !!req.body.isHosted,
				rules: [Validation.isNotTruncated, isPdf]
			}
		})
		if (uploadedMedia) data.media = await UploaderUseCases.upload('study/notes', uploadedMedia)
		const { title, description, isHosted, link, media } = data
		const validateData = {
			title, description, isHosted, link,
			...(changedMedia ? { media } : {})
		}

		const authUserId = req.authUser!.id

		const updatedNote = await NotesUseCases.update({ id: req.params.id, userId: authUserId, data: validateData })

		if (updatedNote) return updatedNote
		throw new NotAuthorizedError()
	}

	static async CreateNote (req: Request) {
		const data = validate({
			title: req.body.title,
			description: req.body.description,
			isHosted: req.body.isHosted,
			link: req.body.link,
			media: req.files.media?.[0] ?? null
		}, {
			title: { required: true, rules: [Validation.isString, Validation.isLongerThanX(2)] },
			description: { required: true, rules: [Validation.isString] },
			isHosted: { required: false, rules: [Validation.isBoolean] },
			link: { required: !req.body.isHosted, rules: [Validation.isString] },
			media: { required: !!req.body.isHosted, rules: [Validation.isNotTruncated, isPdf] }
		})

		const media = data.media ? await UploaderUseCases.upload('study/notes', data.media) : null
		const user = await UsersUseCases.find(req.authUser!.id)
		if (!user) throw new BadRequestError('user not found')
		return await NotesUseCases.add({ ...data, media, user: user.getEmbedded() })
	}

	static async DeleteNote (req: Request) {
		const authUserId = req.authUser!.id
		const isDeleted = await NotesUseCases.delete({ id: req.params.id, userId: authUserId })
		if (isDeleted) return isDeleted
		throw new NotAuthorizedError()
	}
}