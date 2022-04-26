import { AuthUseCases, AuthUsersUseCases } from '@modules/auth'
import { AuthTypes, Request, validate, Validation, ValidationError } from '@utils/commons'
import { generateAuthOutput } from '@utils/modules/auth'
import { UploadFile } from '@modules/storage'

export class EmailsController {
	static async signup (req: Request) {
		const userCredential = {
			email: req.body.email,
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			password: req.body.password,
			photo: req.files.photo?.[0] ?? null,
			coverPhoto: req.files.coverPhoto?.[0] ?? null,
			referrer: req.body.referrer,
			description: req.body.description
		}

		const user = await AuthUsersUseCases.findUserByEmail(userCredential.email)

		const isUniqueInDb = (_: string) => {
			if (!user) return Validation.isValid()
			if (user.authTypes.includes(AuthTypes.email)) return Validation.isInvalid('this email already exists with a password attached')
			if (user.authTypes.includes(AuthTypes.google)) return Validation.isInvalid('this email is associated with a google account. Try signing in with google')
			return Validation.isInvalid('email already in use')
		}

		const {
			email, firstName, lastName,
			password, description, referrer,
			photo: userPhoto, coverPhoto: userCoverPhoto
		} = validate(userCredential, {
			email: { required: true, rules: [Validation.isEmail, isUniqueInDb] },
			password: {
				required: true,
				rules: [Validation.isString, Validation.isLongerThanX(7), Validation.isShorterThanX(17)]
			},
			description: {
				required: true,
				rules: [Validation.isString]
			},
			photo: { required: false, rules: [Validation.isNotTruncated, Validation.isImage] },
			coverPhoto: { required: false, rules: [Validation.isNotTruncated, Validation.isImage] },
			firstName: { required: true, rules: [Validation.isString, Validation.isLongerThanX(2)] },
			lastName: { required: true, rules: [Validation.isString, Validation.isLongerThanX(2)] },
			referrer: { required: false, rules: [Validation.isString] }
		})
		const photo = userPhoto ? await UploadFile.call('profiles/photos', userPhoto) : null
		const coverPhoto = userCoverPhoto ? await UploadFile.call('profiles/coverPhotos', userCoverPhoto) : null
		const validateData = {
			firstName, lastName, email, password, photo, coverPhoto, description, referrer
		}

		const updatedUser = user
			? await AuthUsersUseCases.updateUserDetails({ userId: user.id, data: validateData })
			: await AuthUseCases.registerUser(validateData)

		return await generateAuthOutput(updatedUser)
	}

	static async signin (req: Request) {
		const validateData = validate({
			email: req.body.email,
			password: req.body.password
		}, {
			email: { required: true, rules: [Validation.isEmail] },
			password: { required: true, rules: [Validation.isString] }
		})

		const data = await AuthUseCases.authenticateUser(validateData)
		return await generateAuthOutput(data)
	}

	static async sendVerificationMail (req: Request) {
		const { email, redirectUrl } = validate({
			email: req.body.email,
			redirectUrl: req.body.redirectUrl
		}, {
			email: { required: true, rules: [Validation.isEmail] },
			redirectUrl: { required: true, rules: [Validation.isString] }
		})

		const user = await AuthUsersUseCases.findUserByEmail(email)
		if (!user) throw new ValidationError([{ field: 'email', messages: ['No account with such email exists'] }])

		return await AuthUseCases.sendVerificationMail({ email, redirectUrl })
	}

	static async verifyEmail (req: Request) {
		const { token } = validate({
			token: req.body.token
		}, {
			token: { required: true, rules: [Validation.isString] }
		})

		const data = await AuthUseCases.verifyEmail(token)
		return await generateAuthOutput(data)
	}
}