import { AuthUseCases, AuthUsersUseCases } from '@modules/auth'
import { UploaderUseCases } from '@modules/storage'
import { AuthTypes, Request, Schema, validateReq, Validation, ValidationError } from '@utils/app/package'
import { generateAuthOutput, verifyReferrer } from '@utils/modules/auth'

export class EmailsController {
	static async signup (req: Request) {
		const userCredential = {
			email: req.body.email ?? '',
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			password: req.body.password,
			photo: req.files.photo?.[0] ?? null,
			referrer: req.body.referrer ?? null,
			description: req.body.description
		}

		const user = await AuthUsersUseCases.findUserByEmail(userCredential.email)

		const {
			email, firstName, lastName,
			password, description, referrer, photo: userPhoto
		} = validateReq({
			email: Schema.string().email().addRule((value) => {
				const email = value as string
				if (!user) return Validation.isValid(email)
				if (user.authTypes.includes(AuthTypes.email)) return Validation.isInvalid(['this email already exists with a password attached'], email)
				if (user.authTypes.includes(AuthTypes.google)) return Validation.isInvalid(['this email is associated with a google account. Try signing in with google'], email)
				return Validation.isInvalid(['email already in use'], email)
			}),
			password: Schema.string().min(8).max(16),
			description: Schema.string(),
			photo: Schema.file().image().nullable(),
			firstName: Schema.string().min(3),
			lastName: Schema.string().min(3),
			referrer: Schema.string().nullable()
		}, userCredential)

		const photo = userPhoto ? await UploaderUseCases.upload('profiles/photos', userPhoto) : null
		const validateData = {
			firstName, lastName, email, password, photo, description,
			referrer: await verifyReferrer(referrer) ? referrer : null
		}

		const updatedUser = user
			? await AuthUsersUseCases.updateUserDetails({ userId: user.id, data: validateData })
			: await AuthUseCases.registerUser(validateData)

		return await generateAuthOutput(updatedUser)
	}

	static async signin (req: Request) {
		const validateData = validateReq({
			email: Schema.string().email(),
			password: Schema.string(),
		}, req.body)

		const data = await AuthUseCases.authenticateUser(validateData)
		return await generateAuthOutput(data)
	}

	static async sendVerificationMail (req: Request) {
		const { email } = validateReq({
			email: Schema.string().email()
		}, req.body)

		const user = await AuthUsersUseCases.findUserByEmail(email)
		if (!user) throw new ValidationError([{ field: 'email', messages: ['No account with such email exists'] }])

		return await AuthUseCases.sendVerificationMail(user.email)
	}

	static async verifyEmail (req: Request) {
		const { token } = validateReq({
			token: Schema.force.string()
		}, req.body)

		const data = await AuthUseCases.verifyEmail(token)
		return await generateAuthOutput(data)
	}
}