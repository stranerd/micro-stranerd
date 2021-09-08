import { FindUser, FindUserByEmail, UpdateUserProfile, UpdateUserRole } from '@modules/index'
import { AuthApps, NotFoundError, Request, validate, Validation } from '@utils/commons'
import { signOutUser } from '@utils/modules/auth'
import { superAdminEmail } from '@utils/environment'

export class UserController {
	static async findUser (req: Request) {
		const userId = req.authUser!.id
		return await FindUser.execute(userId)
	}

	static async updateUser (req: Request) {
		const userId = req.authUser!.id
		const isLongerThan2 = (val: string) => Validation.isLongerThan(val, 2)

		const validateData = validate({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			photo: req.body.photo
		}, {
			firstName: { required: true, rules: [isLongerThan2] },
			lastName: { required: true, rules: [isLongerThan2] },
			photo: { required: false, rules: [Validation.isImage] }
		})

		return await UpdateUserProfile.execute({ userId, data: validateData })
	}

	static async updateUserRole (req: Request) {
		const validateData = validate({
			app: req.body.app,
			role: req.body.role,
			userId: req.body.userId,
			value: req.body.value
		}, {
			app: { required: true, rules: [] },
			role: { required: true, rules: [] },
			value: { required: true, rules: [] },
			userId: { required: true, rules: [] }
		})

		return await UpdateUserRole.execute(validateData)
	}

	static async signout (req: Request) {
		return await signOutUser(req.authUser?.id ?? '')
	}

	static async superAdmin (_: Request) {
		const user = await FindUserByEmail.execute(superAdminEmail)
		if (!user) throw new NotFoundError()
		return await UpdateUserRole.execute({
			app: AuthApps.Stranerd,
			role: 'isAdmin',
			userId: user.id,
			value: true
		})
	}
}