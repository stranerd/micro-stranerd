import { AddNote, DeleteNote, FindNote, GetNotes, UpdateNote } from '@modules/study'
import { FindUser } from '@modules/users'
import { BadRequestError, NotAuthorizedError, QueryParams, Request, validate, Validation } from '@utils/commons'
import { UploadFile } from '@modules/storage'

const isPdf = (file: any) => {
	const isValid = Validation.isFile(file).valid && file.type === 'application/pdf'
	return isValid ? Validation.isValid() : Validation.isInvalid('only pdf files are supported')
}

export class NoteController {
	static async FindNote (req: Request) {
		return await FindNote.execute(req.params.id)
	}

	static async GetNote (req: Request) {
		const query = req.query as QueryParams
		return await GetNotes.execute(query)
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
			title: { required: true, rules: [Validation.isString, Validation.isExtractedHTMLLongerThanX(2)] },
			description: { required: true, rules: [Validation.isString] },
			isHosted: { required: false, rules: [Validation.isBoolean] },
			link: { required: false, rules: [Validation.isRequiredIfX(!req.body.isHosted), Validation.isString] },
			media: {
				required: false,
				rules: [Validation.isRequiredIfX(!!req.body.isHosted), Validation.isNotTruncated, isPdf]
			}
		})
		if (uploadedMedia) data.media = await UploadFile.call('study/notes', uploadedMedia)
		const { title, description, isHosted, link, media } = data
		const validateData = {
			title, description, isHosted, link,
			...(changedMedia ? { media } : {})
		}

		const authUserId = req.authUser!.id

		const updatedNote = await UpdateNote.execute({ id: req.params.id, userId: authUserId, data: validateData })

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
			title: { required: true, rules: [Validation.isString, Validation.isExtractedHTMLLongerThanX(2)] },
			description: { required: true, rules: [Validation.isString] },
			isHosted: { required: false, rules: [Validation.isBoolean] },
			link: { required: false, rules: [Validation.isRequiredIfX(!req.body.isHosted), Validation.isString] },
			media: { required: false, rules: [Validation.isRequiredIfX(!!req.body.isHosted), isPdf] }
		})

		const media = data.media ? await UploadFile.call('study/notes', data.media) : null
		const user = await FindUser.execute(req.authUser!.id)
		if (!user) throw new BadRequestError('user not found')
		return await AddNote.execute({
			...data, media,
			userBio: user.bio,
			userRoles: user.roles,
			userId: user.id
		})
	}

	static async DeleteNote (req: Request) {
		const authUserId = req.authUser!.id
		const isDeleted = await DeleteNote.execute({ id: req.params.id, userId: authUserId })
		if (isDeleted) return isDeleted
		throw new NotAuthorizedError()
	}
}