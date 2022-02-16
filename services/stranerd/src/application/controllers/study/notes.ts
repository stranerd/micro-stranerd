import { AddNote, DeleteNote, FindNote, GetNotes, SetSaved, UpdateNote } from '@modules/study'
import { FindUser } from '@modules/users'
import { NotAuthorizedError, NotFoundError, QueryParams, Request, validate, Validation } from '@utils/commons'
import { saveNewItemToSet } from '@utils/modules/study/sets'

export class NoteController {
	static async FindNote (req: Request) {
		return await FindNote.execute(req.params.id)
	}

	static async GetNote (req: Request) {
		const query = req.query as QueryParams
		query.auth = [{ field: 'isPublic', value: true }, ...(req.authUser ? [{
			field: 'userId',
			value: req.authUser.id
		}] : [])]
		return await GetNotes.execute(query)
	}

	static async UpdateNote (req: Request) {
		const data = validate({
			title: req.body.title,
			description: req.body.description,
			isPublic: req.body.isPublic,
			tags: req.body.tags,
			isHosted: req.body.isHosted,
			link: req.body.link,
			media: req.body.media,
			preview: req.body.preview
		}, {
			title: { required: true, rules: [Validation.isString, Validation.isExtractedHTMLLongerThanX(2)] },
			description: { required: true, rules: [Validation.isString] },
			isPublic: { required: true, rules: [Validation.isBoolean] },
			tags: {
				required: true,
				rules: [Validation.isArrayOfX((cur) => Validation.isString(cur).valid, 'strings')]
			},
			isHosted: { required: false, rules: [Validation.isBoolean] },
			link: { required: false, rules: [Validation.isRequiredIfX(!req.body.isHosted), Validation.isString] },
			media: { required: false, rules: [Validation.isRequiredIfX(!!req.body.isHosted), Validation.isFile] },
			preview: { required: false, rules: [Validation.isImage] }
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
			isPublic: req.body.isPublic,
			tags: req.body.tags,
			isHosted: req.body.isHosted,
			link: req.body.link,
			media: req.body.media,
			preview: req.body.preview
		}, {
			title: { required: true, rules: [Validation.isString, Validation.isExtractedHTMLLongerThanX(2)] },
			description: { required: true, rules: [Validation.isString] },
			isPublic: { required: true, rules: [Validation.isBoolean] },
			tags: {
				required: true,
				rules: [Validation.isArrayOfX((cur) => Validation.isString(cur).valid, 'strings')]
			},
			isHosted: { required: false, rules: [Validation.isBoolean] },
			link: { required: false, rules: [Validation.isRequiredIfX(!req.body.isHosted), Validation.isString] },
			media: { required: false, rules: [Validation.isRequiredIfX(!!req.body.isHosted), Validation.isFile] },
			preview: { required: false, rules: [Validation.isImage] }
		})

		const authUserId = req.authUser!.id

		const user = await FindUser.execute(authUserId)

		if (user) {
			const note = await AddNote.execute({
				...data,
				userBio: user.bio,
				userRoles: user.roles,
				userId: authUserId
			})
			await saveNewItemToSet({
				setId: req.body.setId?.toString() ?? null,
				itemId: note.id,
				userId: note.userId,
				type: SetSaved.notes
			})
			return note
		}
		throw new NotFoundError()
	}

	static async DeleteNote (req: Request) {
		const authUserId = req.authUser!.id
		const isDeleted = await DeleteNote.execute({ id: req.params.id, userId: authUserId })
		if (isDeleted) return isDeleted
		throw new NotAuthorizedError()
	}
}