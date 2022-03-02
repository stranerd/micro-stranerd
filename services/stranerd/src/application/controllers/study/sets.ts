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
		return await GetSets.execute(query)
	}

	static async CreateSet (req: Request) {
		const authUserId = req.authUser!.id
		const user = await FindUser.execute(authUserId)
		const isUsers = req.body.data?.type === SetType.users
		const isClasses = req.body.data?.type === SetType.classes
		if (!user) throw new NotFoundError()

		const { name, type, classId } = validate({
			name: req.body.name,
			type: req.body.data?.type,
			classId: req.body.data?.classId
		}, {
			name: { required: true, rules: [Validation.isString, Validation.isLongerThanX(2)] },
			type: {
				required: true,
				rules: [Validation.isString, Validation.arrayContainsX(Object.values(SetType), (cur, val) => cur === val)]
			},
			classId: { required: false, rules: [Validation.isRequiredIfX(isClasses), Validation.isString] }
		})

		let classInst = null as ClassEntity | null
		if (classId) classInst = await FindClass.execute(classId)
		if (isClasses && !classInst) throw new NotFoundError()
		if (isClasses && classInst!.getAllUsers().includes(authUserId)) throw new NotAuthorizedError()

		const data = {
			name,
			userId: user.id, userBio: user.bio, userRoles: user.roles,
			data: isClasses ? { type, classId } : isUsers ? { type } : ({} as any)
		}

		return await AddSet.execute(data)
	}

	static async UpdateSet (req: Request) {
		const { name } = validate({
			name: req.body.name
		}, {
			name: { required: true, rules: [Validation.isString, Validation.isLongerThanX(2)] }
		})

		const data = { name }

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