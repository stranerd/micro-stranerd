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
		const validateData = validate({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			description: req.body.description,
			photo: req.body.photo
		}, {
			firstName: { required: true, rules: [Validation.isString, Validation.isLongerThanX(2)] },
			lastName: { required: true, rules: [Validation.isString, Validation.isLongerThanX(2)] },
			description: { required: true, rules: [Validation.isString] },
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
			app: {
				required: true,
				rules: [Validation.arrayContainsX(Object.values<string>(AuthApps), (cur, val) => cur === val)]
			},
			role: { required: true, rules: [Validation.isString] },
			value: { required: true, rules: [Validation.isBoolean] },
			userId: { required: true, rules: [Validation.isString] }
		})

		return await UpdateUserRole.execute(validateData)
	}

	static async signout (req: Request) {
		return await signOutUser(req.authUser?.id ?? '')
	}

	static async superAdmin (_: Request) {
		const user = await FindUserByEmail.execute(superAdminEmail)
		if (!user) throw new NotFoundError()
		const res = await Promise.all(
			Object.values(AuthApps).map(async (app) => await UpdateUserRole.execute({
				app,
				role: 'isAdmin',
				userId: user.id,
				value: true
			}))
		)
		return res.every((r) => r)
	}
}