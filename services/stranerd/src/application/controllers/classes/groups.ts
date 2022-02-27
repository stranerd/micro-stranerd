import { AddGroup, DeleteGroup, FindClass, FindGroup, GetGroups, UpdateGroup } from '@modules/classes'
import { FindUser } from '@modules/users'
import { NotAuthorizedError, NotFoundError, QueryParams, Request, validate, Validation } from '@utils/commons'

export class GroupController {
	static async FindGroup (req: Request) {
		return await FindGroup.execute(req.params.id)
	}

	static async GetGroup (req: Request) {
		const query = req.query as QueryParams
		return await GetGroups.execute(query)
	}

	static async UpdateGroup (req: Request) {
		const authUserId = req.authUser!.id
		const user = await FindUser.execute(authUserId)
		if (!user) throw new NotFoundError()

		const { name } = validate({
			name: req.body.name
		}, {
			name: { required: true, rules: [Validation.isString, Validation.isExtractedHTMLLongerThanX(2)] }
		})

		const data = { name }

		const updatedGroup = await UpdateGroup.execute({ id: req.params.id, userId: authUserId, data })

		if (updatedGroup) return updatedGroup
		throw new NotAuthorizedError()
	}

	static async CreateGroup (req: Request) {
		const authUserId = req.authUser!.id
		const user = await FindUser.execute(authUserId)
		if (!user) throw new NotFoundError()

		const { name, classId } = validate({
			name: req.body.name,
			classId: req.body.classId
		}, {
			name: { required: true, rules: [Validation.isString, Validation.isExtractedHTMLLongerThanX(2)] },
			classId: { required: true, rules: [Validation.isString] }
		})

		const classInst = await FindClass.execute(classId)
		if (!classInst) throw new NotFoundError()
		if (classInst!.getAllUsers().includes(authUserId)) throw new NotAuthorizedError()

		const data = {
			name, classId,
			userId: authUserId,
			userBio: user.bio,
			userRoles: user.roles,
			users: classInst.getAllMembers()
		}

		return await AddGroup.execute(data)
	}

	static async DeleteGroup (req: Request) {
		const authUserId = req.authUser!.id
		const isDeleted = await DeleteGroup.execute({ id: req.params.id, userId: authUserId })
		if (isDeleted) return isDeleted
		throw new NotAuthorizedError()
	}
}