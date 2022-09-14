import { BadgesUseCases } from '@modules/users'
import { Request } from '@utils/app/package'

export class BadgesController {
	static async get (req: Request) {
		return await BadgesUseCases.get(req.authUser!.id)
	}
}