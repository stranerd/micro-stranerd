import { FindUser, UpdateUserStreak } from '@modules/users'
import { Request } from '@utils/commons'

export class UsersController {
	static async findUser (req: Request) {
		return await FindUser.execute(req.params.id)
	}

	static async updateStreak (req: Request) {
		return await UpdateUserStreak.execute(req.authUser!.id)
	}
}