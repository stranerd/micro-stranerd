import { AddSet, DeleteSet, FindSet, GetSets, UpdateSet, UpdateSetProp } from '@modules/study'
import { NotAuthorizedError, NotFoundError, QueryParams, Request, validate, Validation } from '@utils/commons'
import { FindUser } from '@modules/users'

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
		if (!user) throw new NotFoundError()

		const data = validate({
			name: req.body.name,
			isPublic: !!req.body.isPublic,
			tags: req.body.tags
		}, {
			name: { required: true, rules: [Validation.isString, Validation.isLongerThanX(2)] },
			isPublic: { required: true, rules: [Validation.isBoolean] },
			tags: {
				required: true,
				rules: [Validation.isArrayOfX((cur) => Validation.isString(cur).valid, 'strings'), Validation.hasMoreThanX(0), Validation.hasLessThanX(4)]
			}
		})

		return await AddSet.execute({ ...data, isRoot: false, userId: user.id, userBio: user.bio })
	}

	static async UpdateSet (req: Request) {
		const data = validate({
			name: req.body.name,
			isPublic: !!req.body.isPublic,
			tags: req.body.tags
		}, {
			name: { required: true, rules: [Validation.isString, Validation.isLongerThanX(2)] },
			isPublic: { required: true, rules: [Validation.isBoolean] },
			tags: {
				required: true,
				rules: [Validation.isArrayOfX((cur) => Validation.isString(cur).valid, 'strings'), Validation.hasMoreThanX(0), Validation.hasLessThanX(4)]
			}
		})

		return await UpdateSet.execute({ id: req.params.id, userId: req.authUser!.id, data })
	}

	static async SaveProp (req: Request) {
		const data = validate({
			type: req.body.type,
			propIds: req.body.propIds
		}, {
			type: {
				required: true,
				rules: [Validation.isString, Validation.arrayContainsX(['notes', 'videos', 'flashCards', 'testPreps'], (cur, val) => cur === val)]
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
				rules: [Validation.isString, Validation.arrayContainsX(['notes', 'videos', 'flashCards', 'testPreps'], (cur, val) => cur === val)]
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