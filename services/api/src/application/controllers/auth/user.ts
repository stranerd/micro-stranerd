import { AuthUseCases, AuthUsersUseCases } from '@modules/auth'
import { UploaderUseCases } from '@modules/storage'
import { AuthRole, BadRequestError, Enum, NotFoundError, Request, Schema, validateReq, Validation, verifyAccessToken } from '@utils/app/package'
import { superAdminEmail } from '@utils/environment'
import { generateAuthOutput, signOutUser } from '@utils/modules/auth'

export class UserController {
	static async findUser (req: Request) {
		const userId = req.authUser!.id
		return await AuthUsersUseCases.findUser(userId)
	}

	static async updateUser (req: Request) {
		const userId = req.authUser!.id
		const uploadedPhoto = req.files.photo?.[0] ?? null
		const changedPhoto = !!uploadedPhoto || req.body.photo === null
		const data = validateReq({
			firstName: Schema.string().min(3),
			lastName: Schema.string().min(3),
			description: Schema.string(),
			photo: Schema.file().image().nullable()
		}, { ...req.body, photo: uploadedPhoto })
		const { firstName, lastName, description } = data
		const photo = uploadedPhoto ? await UploaderUseCases.upload('profiles/photos', uploadedPhoto) : undefined

		return await AuthUsersUseCases.updateUserProfile({
			userId,
			data: {
				firstName, lastName, description,
				...(changedPhoto ? { photo } : {}) as any
			}
		})
	}

	static async updateUserRole (req: Request) {
		const { role, userId, value } = validateReq({
			role: Schema.any<Enum<typeof AuthRole>>().in([AuthRole.isStranerdAdmin, AuthRole.isStranerdTutor]),
			userId: Schema.string().min(1),
			value: Schema.boolean()
		}, req.body)
		if (req.authUser!.id === userId) throw new BadRequestError('You cannot modify your own roles')

		return await AuthUsersUseCases.updateUserRole({
			userId, roles: { [role]: value }
		})
	}

	static async signout (req: Request) {
		const user = await verifyAccessToken(req.headers.AccessToken ?? '').catch(() => null)
		return await signOutUser(user?.id ?? '')
	}

	static async superAdmin (_: Request) {
		const user = await AuthUsersUseCases.findUserByEmail(superAdminEmail)
		if (!user) throw new NotFoundError()
		return await AuthUsersUseCases.updateUserRole({
			userId: user.id,
			roles: {
				[AuthRole.isStranerdAdmin]: true,
				[AuthRole.isSuperAdmin]: true
			}
		})
	}

	static async delete (req: Request) {
		const authUserId = req.authUser!.id
		const deleted = await AuthUsersUseCases.deleteUsers([authUserId])
		await signOutUser(authUserId)
		return deleted
	}

	static async sendVerificationText (req: Request) {
		const { phone } = validateReq({
			phone: Schema.any().addRule(Validation.isValidPhone())
		}, req.body)

		return await AuthUseCases.sendVerificationText({
			id: req.authUser!.id, phone
		})
	}

	static async verifyPhone (req: Request) {
		const { token } = validateReq({
			token: Schema.force.string()
		}, req.body)

		const data = await AuthUseCases.verifyPhone(token)
		return await generateAuthOutput(data)
	}
}