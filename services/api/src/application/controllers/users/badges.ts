import { BadgesUseCases } from '@modules/users'
import { Request } from '@utils/commons'

export class BadgesController {
	static async findBadge (req: Request) {
		return await BadgesUseCases.find(req.authUser!.id)
	}
}