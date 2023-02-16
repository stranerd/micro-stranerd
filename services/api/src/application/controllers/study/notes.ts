import { NotesUseCases } from '@modules/study'
import { UsersUseCases } from '@modules/users'
import {
	BadRequestError,
	NotAuthorizedError,
	QueryKeys,
	QueryParams,
	Request,
	Schema, validateReq,
	Validation
} from '@utils/app/package'

export class NoteController {
	static async FindNote(req: Request) {
		return await NotesUseCases.find(req.params.id)
	}

	static async GetNote(req: Request) {
		const query = req.query as QueryParams
		query.auth = [{ field: 'isPrivate', value: false }]
		if (req.authUser) {
			query.authType = QueryKeys.or
			query.auth.push({ field: 'user.id', value: req.authUser!.id })
		}
		return await NotesUseCases.get(query)
	}

	static async UpdateNote(req: Request) {
		const data = validateReq({
			title: Schema.string().min(1),
			content: Schema.string().min(1),
			isPrivate: Schema.boolean()
		}, req.body)

		const authUserId = req.authUser!.id
		const updatedNote = await NotesUseCases.update({
			id: req.params.id, userId: authUserId, data: {
				...data, links: Validation.extractUrls(data.content)
			}
		})

		if (updatedNote) return updatedNote
		throw new NotAuthorizedError()
	}

	static async CreateNote(req: Request) {
		const data = validateReq({
			title: Schema.string().min(1),
			content: Schema.string().min(1),
			isPrivate: Schema.boolean()
		}, req.body)

		const user = await UsersUseCases.find(req.authUser!.id)
		if (!user || user.isDeleted()) throw new BadRequestError('user not found')
		return await NotesUseCases.add({
			...data, user: user.getEmbedded(),
			links: Validation.extractUrls(data.content)
		})
	}

	static async DeleteNote(req: Request) {
		const authUserId = req.authUser!.id
		const isDeleted = await NotesUseCases.delete({ id: req.params.id, userId: authUserId })
		if (isDeleted) return isDeleted
		throw new NotAuthorizedError()
	}
}