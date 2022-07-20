import { PlansUseCases } from '@modules/payment'
import { QueryParams, Request } from '@utils/commons'

export class PlansController {
	static async find (req: Request) {
		return await PlansUseCases.find(req.params.id)
	}

	static async get (req: Request) {
		const query = req.query as QueryParams
		return await PlansUseCases.get(query)
	}
}