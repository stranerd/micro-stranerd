import { FindBadge } from '@modules/users'
import { Request } from '@utils/commons'

export class BadgesController {
	static async findBadge (req: Request) {
		return await FindBadge.execute(req.authUser!.id)
	}
}