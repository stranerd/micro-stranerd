import { ClassesUseCases, ClassUsers, GroupsUseCases } from '@modules/classes'
import { UsersUseCases } from '@modules/users'
import {
	BadRequestError,
	NotAuthorizedError,
	QueryKeys,
	QueryParams,
	Request,
	Schema, validateReq
} from '@utils/app/package'

export class GroupController {
	static async FindGroup (req: Request) {
		const group = await GroupsUseCases.find(req.params.id)
		if (!group || group.classId !== req.params.classId || !group.users.members.includes(req.authUser!.id)) return null
		return group
	}

	static async GetGroup (req: Request) {
		const query = req.query as QueryParams
		query.authType = QueryKeys.and
		query.auth = [{ field: 'classId', value: req.params.classId },
			{ field: 'users.members', value: req.authUser!.id }]
		return await GroupsUseCases.get(query)
	}

	static async UpdateGroup (req: Request) {
		const authUserId = req.authUser!.id
		const data = validateReq({
			name: Schema.string().min(3)
		}, req.body)

		const updatedGroup = await GroupsUseCases.update({
			id: req.params.id,
			classId: req.params.classId,
			userId: authUserId,
			data
		})

		if (updatedGroup) return updatedGroup
		throw new NotAuthorizedError()
	}

	static async CreateGroup (req: Request) {
		const authUserId = req.authUser!.id
		const user = await UsersUseCases.find(authUserId)
		if (!user || user.isDeleted()) throw new BadRequestError('user not found')

		const data = validateReq({
			name: Schema.string().min(3),
			classId: Schema.string().min(1)
		}, { ...req.body, classId: req.params.classId })

		const classInst = await ClassesUseCases.find(data.classId)
		if (!classInst) throw new BadRequestError('class not found')
		if (!classInst!.users[ClassUsers.admins].includes(authUserId)) throw new BadRequestError('not a class admin')

		return await GroupsUseCases.add({
			...data, user: user.getEmbedded(),
			users: classInst.users
		})
	}

	static async DeleteGroup (req: Request) {
		const authUserId = req.authUser!.id
		const isDeleted = await GroupsUseCases.delete({
			id: req.params.id,
			classId: req.params.classId,
			userId: authUserId
		})
		if (isDeleted) return isDeleted
		throw new NotAuthorizedError()
	}
}