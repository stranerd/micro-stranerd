import { AddSet, DeleteSet, FindSet, GetSets, SetSaved, SetType, UpdateSet, UpdateSetProp } from '@modules/study'
import { NotAuthorizedError, NotFoundError, QueryParams, Request, validate, Validation } from '@utils/commons'
import { FindUser } from '@modules/users'
import { ClassEntity, FindClass } from '@modules/classes'

export class SetController {
	static async FindSet (req: Request) {
		return await FindSet.execute(req.params.id)
	}

	static async GetSets (req: Request) {
		const query = req.query as QueryParams
		query.auth = [{ field: 'isPublic', value: true }, ...(req.authUser ? [{
			field: 'userId',
			value: req.authUser.id
		}] : [])]
		return await GetSets.execute(query)
	}

	static async CreateSet (req: Request) {
		const authUserId = req.authUser!.id
		const user = await FindUser.execute(authUserId)
		const isUsers = req.body.data?.type === SetType.users
		const isClasses = req.body.data?.type === SetType.classes
		if (!user) throw new NotFoundError()

		const val = validate({
			name: req.body.name,
			isPublic: !!req.body.isPublic,
			parent: req.body.parent,
			tags: req.body.tags,
			type: req.body.data?.type,
			classId: req.body.data?.classId
		}, {
			name: { required: true, rules: [Validation.isString, Validation.isLongerThanX(2)] },
			isPublic: { required: true, rules: [Validation.isBoolean] },
			parent: { required: true, rules: [Validation.isString] },
			tags: {
				required: true,
				rules: [Validation.isArrayOfX((cur) => Validation.isString(cur).valid, 'strings')]
			},
			type: {
				required: true,
				rules: [Validation.isString, Validation.arrayContainsX(Object.values(SetType), (cur, val) => cur === val)]
			},
			classId: { required: false, rules: [Validation.isRequiredIfX(isClasses), Validation.isString] }
		})
		const { name, isPublic, tags, type, classId  } = val
		let { parent } = val

		if (parent) {
			const set = await FindSet.execute(parent)
			if (!set) throw new NotFoundError()
			if (set.userId !== authUserId) parent = null
		}

		let classInst = null as ClassEntity | null
		if (classId) classInst = await FindClass.execute(classId)
		if (isClasses && !classInst) throw new NotFoundError()
		if (isClasses && classInst!.getAllUsers().includes(authUserId)) throw new NotAuthorizedError()

		const data = {
			name, isPublic, parent, tags,
			userId: user.id, userBio: user.bio, userRoles: user.roles,
			data: isClasses ? { type, classId } : isUsers ? { type } : ({} as any)
		}

		return await AddSet.execute(data)
	}

	static async UpdateSet (req: Request) {
		const { name, isPublic, tags } = validate({
			name: req.body.name,
			isPublic: !!req.body.isPublic,
			tags: req.body.tags
		}, {
			name: { required: true, rules: [Validation.isString, Validation.isLongerThanX(2)] },
			isPublic: { required: true, rules: [Validation.isBoolean] },
			tags: {
				required: true,
				rules: [Validation.isArrayOfX((cur) => Validation.isString(cur).valid, 'strings')]
			}
		})

		const data = { name, isPublic, tags }

		const updatedSet = await UpdateSet.execute({ id: req.params.id, userId: req.authUser!.id, data })
		if (updatedSet) return updatedSet
		throw new NotAuthorizedError()
	}

	static async SaveProp (req: Request) {
		const data = validate({
			type: req.body.type,
			propIds: req.body.propIds
		}, {
			type: {
				required: true,
				rules: [Validation.isString, Validation.arrayContainsX(Object.values(SetSaved), (cur, val) => cur === val)]
			},
			propIds: {
				required: true,
				rules: [Validation.isArrayOfX((item) => Validation.isString(item).valid, 'strings')]
			}
		})

		const updated = await UpdateSetProp.execute({
			id: req.params.id,
			userId: req.authUser!.id,
			values: data.propIds,
			add: true,
			prop: data.type
		})

		if (updated) return updated
		throw new NotAuthorizedError()
	}

	static async DeleteProp (req: Request) {
		const data = validate({
			type: req.body.type,
			propIds: req.body.propIds
		}, {
			type: {
				required: true,
				rules: [Validation.isString, Validation.arrayContainsX(Object.values(SetSaved), (cur, val) => cur === val)]
			},
			propIds: {
				required: true,
				rules: [Validation.isArrayOfX((item) => Validation.isString(item).valid, 'strings')]
			}
		})

		const updated = await UpdateSetProp.execute({
			id: req.params.id,
			userId: req.authUser!.id,
			values: data.propIds,
			add: false,
			prop: data.type
		})

		if (updated) return updated
		throw new NotAuthorizedError()
	}

	static async DeleteSet (req: Request) {
		const isDeleted = await DeleteSet.execute({ id: req.params.id, userId: req.authUser!.id })

		if (isDeleted) return isDeleted
		throw new NotFoundError()
	}
}