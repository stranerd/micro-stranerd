import { CardsUseCases } from '@modules/payment'
import { NotAuthorizedError, QueryParams, Request } from '@utils/app/package'

export class CardsController {
	static async find (req: Request) {
		const card = await CardsUseCases.find(req.params.id)
		if (!card || card.userId !== req.authUser!.id) return null
		return card
	}

	static async get (req: Request) {
		const query = req.query as QueryParams
		query.auth = [{ field: 'userId', value: req.authUser!.id }]
		return await CardsUseCases.get(query)
	}

	static async makePrimary (req: Request) {
		const updated = await CardsUseCases.makePrimary({ id: req.params.id, userId: req.authUser!.id })
		if (updated) return updated
		throw new NotAuthorizedError()
	}

	static async delete (req: Request) {
		const isDeleted = await CardsUseCases.delete({ id: req.params.id, userId: req.authUser!.id })
		if (isDeleted) return isDeleted
		throw new NotAuthorizedError()
	}
}