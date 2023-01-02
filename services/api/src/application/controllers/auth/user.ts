import { AuthUseCases, AuthUsersUseCases } from '@modules/auth'
import { BadRequestError, NotFoundError, Request, validate, Validation, verifyAccessToken } from '@utils/app/package'
import { generateAuthOutput, signOutUser } from '@utils/modules/auth'
import { superAdminEmail } from '@utils/environment'
import { UploaderUseCases } from '@modules/storage'
import { SupportedAuthRoles } from '@utils/app/types'

const roles = [SupportedAuthRoles.isStranerdAdmin, SupportedAuthRoles.isStranerdTutor]

export class UserController {
	static async findUser (req: Request) {
		const userId = req.authUser!.id
		return await AuthUsersUseCases.findUser(userId)
	}

	static async updateUser (req: Request) {
		const userId = req.authUser!.id
		const uploadedPhoto = req.files.photo?.[0] ?? null
		const changedPhoto = !!uploadedPhoto || req.body.photo === null
		const data = validate({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			description: req.body.description,
			photo: uploadedPhoto as any
		}, {
			firstName: { required: true, rules: [Validation.isString, Validation.isLongerThanX(2)] },
			lastName: { required: true, rules: [Validation.isString, Validation.isLongerThanX(2)] },
			description: { required: true, rules: [Validation.isString] },
			photo: { required: true, nullable: true, rules: [Validation.isNotTruncated, Validation.isImage] }
		})
		const { firstName, lastName, description } = data
		if (uploadedPhoto) data.photo = await UploaderUseCases.upload('profiles/photos', uploadedPhoto)
		const validateData = {
			firstName, lastName, description,
			...(changedPhoto ? { photo: data.photo } : {})
		}

		return await AuthUsersUseCases.updateUserProfile({ userId, data: validateData as any })
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
				[SupportedAuthRoles.isStranerdAdmin]: true,
				[SupportedAuthRoles.isSuperAdmin]: true
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
		const { phone } = validate({
			phone: req.body.phone
		}, {
			phone: {
				required: true, rules: [(phone: { code: string, number: string }) => {
					const { code = '', number = '' } = phone ?? {}
					const isValidCode = Validation.isString(code).valid && code.startsWith('+') && Validation.isNumber(parseInt(code.slice(1))).valid
					const isValidNumber = Validation.isNumber(parseInt(number)).valid
					if (!isValidCode) return Validation.isInvalid('invalid phone code')
					if (!isValidNumber) return Validation.isInvalid('invalid phone number')
					return Validation.isValid()
				}]
			}
		})

		return await AuthUseCases.sendVerificationText({
			id: req.authUser!.id, phone
		})
	}

	static async verifyPhone (req: Request) {
		const { token } = validate({
			token: req.body.token
		}, {
			token: { required: true, rules: [Validation.isString] }
		})

		const data = await AuthUseCases.verifyPhone(token)
		return await generateAuthOutput(data)
	}
}