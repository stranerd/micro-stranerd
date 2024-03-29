import { ClassesUseCases, ClassUsers, SchemesUseCases } from '@modules/classes'
import { UsersUseCases } from '@modules/users'
import {
	BadRequestError,
	NotAuthorizedError,
	QueryKeys,
	QueryParams,
	Request,
	Schema, validateReq, ValidationError
} from '@utils/app/package'

export class SchemeController {
	static async FindScheme (req: Request) {
		const scheme = await SchemesUseCases.find(req.params.id)
		if (!scheme || scheme.classId !== req.params.classId || !scheme.users.members.includes(req.authUser!.id)) return null
		return scheme
	}

	static async GetScheme (req: Request) {
		const query = req.query as QueryParams
		query.authType = QueryKeys.and
		query.auth = [{ field: 'classId', value: req.params.classId },
			{ field: 'users.members', value: req.authUser!.id }]
		return await SchemesUseCases.get(query)
	}

	static async UpdateScheme (req: Request) {
		const authUserId = req.authUser!.id
		const data = validateReq({
			title: Schema.string().min(1),
			topic: Schema.string().min(1),
			start: Schema.time().asStamp(),
			end: Schema.time().min(req.body.start).asStamp()
		}, req.body)

		const classInst = await ClassesUseCases.find(req.params.classId)
		if (!classInst) throw new BadRequestError('class not found')
		if (!classInst.courses.includes(data.title)) throw new ValidationError([{
			messages: ['is not a class course'],
			field: 'title'
		}])

		const updatedScheme = await SchemesUseCases.update({
			id: req.params.id,
			classId: req.params.classId,
			userId: authUserId,
			data
		})

		if (updatedScheme) return updatedScheme
		throw new NotAuthorizedError()
	}

	static async CreateScheme (req: Request) {
		const authUserId = req.authUser!.id
		const user = await UsersUseCases.find(authUserId)
		if (!user || user.isDeleted()) throw new BadRequestError('user not found')

		const data = validateReq({
			title: Schema.string().min(1),
			classId: Schema.string().min(1),
			topic: Schema.string().min(1),
			start: Schema.time().asStamp(),
			end: Schema.time().min(req.body.start).asStamp()
		}, { ...req.body, classId: req.params.classId })

		const classInst = await ClassesUseCases.find(data.classId)
		if (!classInst) throw new BadRequestError('class not found')
		if (!classInst!.users[ClassUsers.admins].includes(authUserId)) throw new BadRequestError('not a class admin')
		if (!classInst.courses.includes(data.title)) throw new ValidationError([{
			messages: ['is not a class course'],
			field: 'title'
		}])

		return await SchemesUseCases.add({
			...data,
			users: classInst.users, user: user.getEmbedded()
		})
	}

	static async DeleteScheme (req: Request) {
		const authUserId = req.authUser!.id
		const isDeleted = await SchemesUseCases.delete({
			id: req.params.id,
			classId: req.params.classId,
			userId: authUserId
		})
		if (isDeleted) return isDeleted
		throw new NotAuthorizedError()
	}

	static async MarkRead (req: Request) {
		return await SchemesUseCases.markRead({
			classId: req.params.classId,
			userId: req.authUser!.id
		})
	}
}