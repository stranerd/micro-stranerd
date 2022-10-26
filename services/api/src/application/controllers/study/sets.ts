import { SetSaved, SetsUseCases } from '@modules/study'
import { BadRequestError, NotAuthorizedError, QueryParams, Request, validate, Validation } from '@utils/app/package'
import { UsersUseCases } from '@modules/users'

export class SetController {
	static async FindSet (req: Request) {
		return await SetsUseCases.find(req.params.id)
	}

	static async GetSets (req: Request) {
		const query = req.query as QueryParams
		return await SetsUseCases.get(query)
	}

	static async CreateSet (req: Request) {
		const { name } = validate({
			name: req.body.name
		}, {
			name: { required: true, rules: [Validation.isString, Validation.isLongerThanX(2)] }
		})

		const authUserId = req.authUser!.id
		const user = await UsersUseCases.find(authUserId)
		if (!user || user.isDeleted()) throw new BadRequestError('user not found')

		return await SetsUseCases.add({ name, user: user.getEmbedded() })
	}

	static async UpdateSet (req: Request) {
		const { name } = validate({
			name: req.body.name
		}, {
			name: { required: true, rules: [Validation.isString, Validation.isLongerThanX(2)] }
		})

		const data = { name }

		const updatedSet = await SetsUseCases.update({ id: req.params.id, userId: req.authUser!.id, data })
		if (updatedSet) return updatedSet
		throw new NotAuthorizedError()
	}

	static async SaveProp (req: Request) {
		const data = validate({
			type: req.body.type,
			propIds: req.body.propIds,
			add: req.body.add
		}, {
			type: {
				required: true,
				rules: [Validation.isString, Validation.arrayContainsX(Object.values(SetSaved), (cur, val) => cur === val)]
			},
			propIds: {
				required: true,
				rules: [Validation.isArrayOfX((item) => Validation.isString(item).valid, 'strings')]
			},
			add: { required: true, rules: [Validation.isBoolean] }
		})

		const updated = await SetsUseCases.updateProp({
			id: req.params.id,
			userId: req.authUser!.id,
			values: data.propIds,
			add: data.add,
			prop: data.type
		})

		if (updated) return updated
		throw new NotAuthorizedError()
	}

	static async DeleteSet (req: Request) {
		const isDeleted = await SetsUseCases.delete({ id: req.params.id, userId: req.authUser!.id })

		if (isDeleted) return isDeleted
		throw new BadRequestError('set not found')
	}
}