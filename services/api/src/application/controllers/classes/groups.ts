import { ClassesUseCases, ClassUsers, GroupsUseCases } from '@modules/classes'
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

export class GroupController {
	static async FindGroup (req: Request) {
		return await GroupsUseCases.find({ id: req.params.id, classId: req.params.classId, userId: req.authUser!.id })
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
		const { name } = validate({
			name: req.body.name
		}, {
			name: { required: true, rules: [Validation.isString, Validation.isLongerThanX(2)] }
		})

		const data = { name }

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
		if (!user) throw new BadRequestError('user not found')

		const { name, classId } = validate({
			name: req.body.name,
			classId: req.params.classId
		}, {
			name: { required: true, rules: [Validation.isString, Validation.isLongerThanX(2)] },
			classId: { required: true, rules: [Validation.isString] }
		})

		const classInst = await ClassesUseCases.find(classId)
		if (!classInst) throw new BadRequestError('class not found')
		if (!classInst!.users[ClassUsers.admins].includes(authUserId)) throw new BadRequestError('not a class admin')

		const data = {
			name, classId, user: user.getEmbedded(),
			users: classInst.users
		}

		return await GroupsUseCases.add(data)
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