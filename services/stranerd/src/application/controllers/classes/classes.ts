import { AddClass, DeleteClass, FindClass, GetClasses, UpdateClass } from '@modules/classes'
import { FindUser } from '@modules/users'
import { NotAuthorizedError, NotFoundError, QueryParams, Request, validate, Validation } from '@utils/commons'

export class ClassController {
	static async FindClass (req: Request) {
		return await FindClass.execute(req.params.id)
	}

	static async GetClass (req: Request) {
		const query = req.query as QueryParams
		return await GetClasses.execute(query)
	}

	static async UpdateClass (req: Request) {
		const authUserId = req.authUser!.id
		const user = await FindUser.execute(authUserId)
		if (!user) throw new NotFoundError()

		const { name, description, avatar } = validate({
			name: req.body.name,
			description: req.body.description,
			avatar: req.body.avatar
		}, {
			name: { required: true, rules: [Validation.isString, Validation.isExtractedHTMLLongerThanX(2)] },
			description: { required: true, rules: [Validation.isString, Validation.isExtractedHTMLLongerThanX(2)] },
			avatar: { required: false, rules: [Validation.isImage] }
		})

		const data = { name, description, avatar }

		const updatedClass = await UpdateClass.execute({ id: req.params.id, userId: authUserId, data })

		if (updatedClass) return updatedClass
		throw new NotAuthorizedError()
	}

	static async CreateClass (req: Request) {
		const authUserId = req.authUser!.id
		const user = await FindUser.execute(authUserId)
		if (!user) throw new NotFoundError()

		const { name, description, avatar } = validate({
			name: req.body.name,
			description: req.body.description,
			avatar: req.body.avatar
		}, {
			name: { required: true, rules: [Validation.isString, Validation.isExtractedHTMLLongerThanX(2)] },
			description: { required: true, rules: [Validation.isString, Validation.isExtractedHTMLLongerThanX(2)] },
			avatar: { required: false, rules: [Validation.isImage] }
		})

		const data = {
			name, description, avatar,
			userId: user.id,
			userBio: user.bio,
			userRoles: user.roles,
			users: {
				admins: [user.id],
				tutors: [], members: [], requests: []
			}
		}

		return await AddClass.execute(data)
	}

	static async DeleteClass (req: Request) {
		const authUserId = req.authUser!.id
		const isDeleted = await DeleteClass.execute({ id: req.params.id, userId: authUserId })
		if (isDeleted) return isDeleted
		throw new NotAuthorizedError()
	}
}