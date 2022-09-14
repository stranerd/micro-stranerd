import { ConnectsUseCases, UsersUseCases } from '@modules/users'
import {
	BadRequestError,
	NotAuthorizedError,
	QueryKeys,
	QueryParams,
	Request,
	validate,
	Validation
} from '@utils/app/package'

export class ConnectsController {
	static async find (req: Request) {
		return await ConnectsUseCases.find({ id: req.params.id, userId: req.authUser!.id })
	}

	static async get (req: Request) {
		const query = req.query as QueryParams
		const authUserId = req.authUser!.id
		query.authType = QueryKeys.or
		query.auth = [{ field: 'from.id', value: authUserId }, { field: 'to.id', value: authUserId }]
		return await ConnectsUseCases.get(query)
	}

	static async delete (req: Request) {
		const isDeleted = await ConnectsUseCases.delete({ id: req.params.id, userId: req.authUser!.id })
		if (isDeleted) return isDeleted
		throw new NotAuthorizedError()
	}

	static async create (req: Request) {
		const { to } = validate({
			to: req.body.to
		}, {
			to: { required: true, rules: [Validation.isString] }
		})
		const fromUser = await UsersUseCases.find(req.authUser!.id)
		if (!fromUser) throw new BadRequestError('profile not found')
		const toUser = await UsersUseCases.find(to)
		if (!toUser) throw new BadRequestError('to not found')

		return await ConnectsUseCases.create({
			from: fromUser.getEmbedded(), to: toUser.getEmbedded(),
			pending: true, accepted: false
		})
	}

	static async accept (req: Request) {
		const { accept } = validate({
			accept: req.body.accept
		}, {
			accept: { required: true, rules: [Validation.isBoolean] }
		})
		const isUpdated = await ConnectsUseCases.accept({
			id: req.params.id, userId: req.authUser!.id, accept
		})
		if (isUpdated) return isUpdated
		throw new NotAuthorizedError()
	}
}