import { FindUser, GetUsers, UpdateUserStreak } from '@modules/users'
import { QueryParams, Request } from '@utils/commons'

export class UsersController {
	static async getUsers (req: Request) {
		const query = req.body as QueryParams
		return await GetUsers.execute(query)
	}

	static async findUser (req: Request) {
		return await FindUser.execute(req.params.id)
	}

	static async updateStreak (req: Request) {
		return await UpdateUserStreak.execute(req.authUser!.id)
	}
}