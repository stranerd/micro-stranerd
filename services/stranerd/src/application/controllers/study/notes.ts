import { AddNote, DeleteNote, FindNote, GetNotes, UpdateNote } from '@modules/study'
import { FindUser } from '@modules/users'
import { NotAuthorizedError, NotFoundError, QueryParams, Request, validate, Validation } from '@utils/commons'

export class NoteController {
	static async FindNote (req: Request) {
		return await FindNote.execute(req.params.id)
	}

	static async GetNote (req: Request) {
		const query = req.query as QueryParams
		return await GetNotes.execute(query)
	}

	static async UpdateNote (req: Request) {
		const data = validate({
			title: req.body.title,
			description: req.body.description,
			isHosted: req.body.isHosted,
			link: req.body.link,
			media: req.body.media
		}, {
			title: { required: true, rules: [Validation.isString, Validation.isExtractedHTMLLongerThanX(2)] },
			description: { required: true, rules: [Validation.isString] },
			isHosted: { required: false, rules: [Validation.isBoolean] },
			link: { required: false, rules: [Validation.isRequiredIfX(!req.body.isHosted), Validation.isString] },
			media: { required: false, rules: [Validation.isRequiredIfX(!!req.body.isHosted), Validation.isFile] }
		})

		const authUserId = req.authUser!.id

		const updatedNote = await UpdateNote.execute({ id: req.params.id, userId: authUserId, data })

		if (updatedNote) return updatedNote
		throw new NotAuthorizedError()
	}

	static async CreateNote (req: Request) {
		const data = validate({
			title: req.body.title,
			description: req.body.description,
			isHosted: req.body.isHosted,
			link: req.body.link,
			media: req.body.media
		}, {
			title: { required: true, rules: [Validation.isString, Validation.isExtractedHTMLLongerThanX(2)] },
			description: { required: true, rules: [Validation.isString] },
			isHosted: { required: false, rules: [Validation.isBoolean] },
			link: { required: false, rules: [Validation.isRequiredIfX(!req.body.isHosted), Validation.isString] },
			media: { required: false, rules: [Validation.isRequiredIfX(!!req.body.isHosted), Validation.isFile] }
		})

		const authUserId = req.authUser!.id

		const user = await FindUser.execute(authUserId)

		if (user) return await AddNote.execute({
			...data,
			userBio: user.bio,
			userRoles: user.roles,
			userId: authUserId
		})
		throw new NotFoundError()
	}

	static async DeleteNote (req: Request) {
		const authUserId = req.authUser!.id
		const isDeleted = await DeleteNote.execute({ id: req.params.id, userId: authUserId })
		if (isDeleted) return isDeleted
		throw new NotAuthorizedError()
	}
}