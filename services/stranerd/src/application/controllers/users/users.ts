import { FindUser, GetUsers, UpdateUserStreak, UpdateUserSubjects } from '@modules/users'
import { QueryParams, Request, validate, Validation } from '@utils/commons'

export class UsersController {
	static async getUsers (req: Request) {
		const query = req.query as QueryParams
		return await GetUsers.execute(query)
	}

	static async findUser (req: Request) {
		return await FindUser.execute(req.params.id)
	}

	static async updateStreak (req: Request) {
		return await UpdateUserStreak.execute(req.authUser!.id)
	}

	static async updateSubjects (req: Request) {
		const data = validate({
			strongestSubject: req.body.strongestSubject,
			weakerSubjects: req.body.weakerSubjects
		}, {
			strongestSubject: { required: true, rules: [Validation.isString] },
			weakerSubjects: {
				required: true,
				rules: [Validation.isArrayOfX((cur) => Validation.isString(cur).valid, 'string')]
			}
		})
		return await UpdateUserSubjects.execute({ ...data, userId: req.authUser!.id })
	}
}