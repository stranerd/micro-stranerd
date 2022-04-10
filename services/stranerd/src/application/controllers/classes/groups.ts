import { AddGroup, DeleteGroup, FindClass, FindGroup, GetGroups, UpdateGroup } from '@modules/classes'
import { FindUser } from '@modules/users'
import { BadRequestError, NotAuthorizedError, QueryParams, Request, validate, Validation } from '@utils/commons'
import { ClassUsers } from '@modules/classes/domain/types'

export class GroupController {
	static async FindGroup (req: Request) {
		return await FindGroup.execute({ id: req.params.id, classId: req.params.classId })
	}

	static async GetGroup (req: Request) {
		const query = req.query as QueryParams
		query.auth = [{ field: 'classId', value: req.params.classId }]
		return await GetGroups.execute(query)
	}

	static async UpdateGroup (req: Request) {
		const authUserId = req.authUser!.id
		const { name } = validate({
			name: req.body.name
		}, {
			name: { required: true, rules: [Validation.isString, Validation.isExtractedHTMLLongerThanX(2)] }
		})

		const data = { name }

		const updatedGroup = await UpdateGroup.execute({
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
		const user = await FindUser.execute(authUserId)
		if (!user) throw new BadRequestError('user not found')

		const { name, classId } = validate({
			name: req.body.name,
			classId: req.params.classId
		}, {
			name: { required: true, rules: [Validation.isString, Validation.isExtractedHTMLLongerThanX(2)] },
			classId: { required: true, rules: [Validation.isString] }
		})

		const classInst = await FindClass.execute(classId)
		if (!classInst) throw new BadRequestError('class not found')
		if (!classInst!.users[ClassUsers.admins].includes(authUserId)) throw new BadRequestError('not a class admin')

		const data = {
			name, classId,
			userId: authUserId,
			userBio: user.bio,
			userRoles: user.roles,
			users: classInst.users
		}

		return await AddGroup.execute(data)
	}

	static async DeleteGroup (req: Request) {
		const authUserId = req.authUser!.id
		const isDeleted = await DeleteGroup.execute({
			id: req.params.id,
			classId: req.params.classId,
			userId: authUserId
		})
		if (isDeleted) return isDeleted
		throw new NotAuthorizedError()
	}
}