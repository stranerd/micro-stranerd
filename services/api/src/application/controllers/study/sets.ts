import { SetSaved, SetsUseCases } from '@modules/study'
import { UsersUseCases } from '@modules/users'
import { BadRequestError, NotAuthorizedError, QueryParams, Request, Schema, validateReq } from '@utils/app/package'

export class SetController {
	static async FindSet(req: Request) {
		return await SetsUseCases.find(req.params.id)
	}

	static async GetSets(req: Request) {
		const query = req.query as QueryParams
		return await SetsUseCases.get(query)
	}

	static async CreateSet(req: Request) {
		const data = validateReq({
			name: Schema.string().min(3),
		}, req.body)

		const authUserId = req.authUser!.id
		const user = await UsersUseCases.find(authUserId)
		if (!user || user.isDeleted()) throw new BadRequestError('user not found')

		return await SetsUseCases.add({ ...data, user: user.getEmbedded() })
	}

	static async UpdateSet(req: Request) {
		const data = validateReq({
			name: Schema.string().min(3),
		}, req.body)

		const updatedSet = await SetsUseCases.update({ id: req.params.id, userId: req.authUser!.id, data })
		if (updatedSet) return updatedSet
		throw new NotAuthorizedError()
	}

	static async SaveProp(req: Request) {
		const data = validateReq({
			type: Schema.any<SetSaved>().in(Object.values(SetSaved), (cur, val) => cur === val),
			propIds: Schema.array(Schema.string().min(1)),
			add: Schema.boolean()
		}, req.body)

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

	static async DeleteSet(req: Request) {
		const isDeleted = await SetsUseCases.delete({ id: req.params.id, userId: req.authUser!.id })

		if (isDeleted) return isDeleted
		throw new BadRequestError('set not found')
	}
}