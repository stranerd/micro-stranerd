import { FindUser } from '../../modules/users'
import { Request } from '@utils/commons'

export class UsersController {
	static async findUser (req: Request) {
		return await FindUser.execute(req.params.id)
	}
}