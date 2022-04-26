import { AuthUsersUseCases } from '@modules/auth'
import { NotFoundError, Request, SupportedAuthRoles, validate, Validation, verifyAccessToken } from '@utils/commons'
import { signOutUser } from '@utils/modules/auth'
import { superAdminEmail } from '@utils/environment'
import { UploadFile } from '@modules/storage'

const roles = Object.values<string>(SupportedAuthRoles).filter((key) => key !== SupportedAuthRoles.isSuperAdmin)

export class UserController {
	static async findUser (req: Request) {
		const userId = req.authUser!.id
		return await AuthUsersUseCases.findUser(userId)
	}

	static async updateUser (req: Request) {
		const userId = req.authUser!.id
		const uploadedPhoto = req.files.photo?.[0]
		const uploadedCoverPhoto = req.files.coverPhoto?.[0]
		const changedPhoto = !!uploadedPhoto || req.body.photo === null
		const changedCoverPhoto = !!uploadedCoverPhoto || req.body.coverPhoto === null
		const data = validate({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			description: req.body.description,
			photo: uploadedPhoto as any,
			coverPhoto: uploadedCoverPhoto as any
		}, {
			firstName: { required: true, rules: [Validation.isString, Validation.isLongerThanX(2)] },
			lastName: { required: true, rules: [Validation.isString, Validation.isLongerThanX(2)] },
			description: { required: true, rules: [Validation.isString] },
			photo: { required: false, rules: [Validation.isNotTruncated, Validation.isImage] },
			coverPhoto: { required: false, rules: [Validation.isNotTruncated, Validation.isImage] }
		})
		const { firstName, lastName, description } = data
		if (uploadedPhoto) data.photo = await UploadFile.call('profiles/photos', uploadedPhoto)
		if (uploadedCoverPhoto) data.coverPhoto = await UploadFile.call('profiles/coverPhotos', uploadedCoverPhoto)
		const validateData = {
			firstName, lastName, description,
			...(changedPhoto ? { photo: data.photo } : {}),
			...(changedCoverPhoto ? { coverPhoto: data.coverPhoto } : {})
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
}