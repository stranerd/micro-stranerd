import { BadgesUseCases } from '@modules/users'
import { Request } from '@utils/commons'

export class BadgesController {
	static async get (req: Request) {
		return await BadgesUseCases.get(req.authUser!.id)
	}
}