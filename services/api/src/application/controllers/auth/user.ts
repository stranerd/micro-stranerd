import { FindUser, FindUserByEmail, UpdateUserProfile, UpdateUserRole } from '@modules/auth'
import { NotFoundError, Request, SupportedAuthRoles, validate, Validation, verifyAccessToken } from '@utils/commons'
import { signOutUser } from '@utils/modules/auth'
import { superAdminEmail } from '@utils/environment'

const roles = Object.values<string>(SupportedAuthRoles).filter((key) => key !== SupportedAuthRoles.isSuperAdmin)

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
			photo: req.body.photo,
			coverPhoto: req.body.coverPhoto
		}, {
			firstName: { required: true, rules: [Validation.isString, Validation.isLongerThanX(2)] },
			lastName: { required: true, rules: [Validation.isString, Validation.isLongerThanX(2)] },
			description: { required: true, rules: [Validation.isString] },
			photo: { required: false, rules: [Validation.isImage] },
			coverPhoto: { required: false, rules: [Validation.isImage] }
		})

		return await UpdateUserProfile.execute({ userId, data: validateData })
	}

	static async updateUserRole (req: Request) {
		const { role, userId, value } = validate({
			role: req.body.role,
			userId: req.body.userId,
			value: req.body.value
		}, {
			role: {
				required: true,
				rules: [Validation.isString, Validation.arrayContainsX(roles, (cur, val) => cur === val)]
			},
			value: { required: true, rules: [Validation.isBoolean] },
			userId: { required: true, rules: [Validation.isString] }
		})

		return await UpdateUserRole.execute({
			userId, roles: { [role]: value }
		})
	}

	static async signout (req: Request) {
		const user = await verifyAccessToken(req.headers.AccessToken ?? '').catch(() => null)
		return await signOutUser(user?.id ?? '')
	}

	static async superAdmin (_: Request) {
		const user = await FindUserByEmail.execute(superAdminEmail)
		if (!user) throw new NotFoundError()
		return await UpdateUserRole.execute({
			userId: user.id,
			roles: {
				[SupportedAuthRoles.isStranerdAdmin]: true,
				isSuperAdmin: true
			}
		})
	}
}