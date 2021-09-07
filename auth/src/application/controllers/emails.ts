import {
	AuthenticateUser,
	FindUserByEmail,
	GetUsers,
	RegisterUser,
	SendVerificationEmail,
	UpdateUserDetails,
	VerifyEmail
} from '@modules/index'
import { AuthTypes, Request, validate, Validation, ValidationError } from '@utils/commons'
import { generateAuthOutput } from '@utils/modules/auth'

export class EmailsController {
	static async signup (req: Request) {
		const userCredential = {
			email: req.body.email,
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			password: req.body.password,
			photo: req.body.photo
		}

		const res = await GetUsers.execute({
			where: [
				{ field: 'email', value: userCredential.email.toLowerCase() },
				{ field: 'authTypes', value: AuthTypes.email }
			],
			limit: 1
		})
		const emailExist = !!res.results[0]

		const isLongerThan7 = (val: string) => Validation.isLongerThan(val, 7)
		const isLongerThan2 = (val: string) => Validation.isLongerThan(val, 2)
		const isShorterThan17 = (val: string) => Validation.isShorterThan(val, 17)
		const isUniqueInDb: Validation.Rule = (_: string) => {
			return emailExist ? { valid: false, error: 'email already in use' } : { valid: true, error: undefined }
		}

		const validateData = validate(userCredential, {
			email: { required: true, rules: [Validation.isEmail, isUniqueInDb] },
			password: { required: true, rules: [isLongerThan7, isShorterThan17] },
			photo: { required: false, rules: [Validation.isImage] },
			firstName: { required: true, rules: [isLongerThan2] },
			lastName: { required: true, rules: [isLongerThan2] }
		})

		const userData = await FindUserByEmail.execute(validateData.email)

		const user = userData
			? await UpdateUserDetails.execute({ userId: userData.id, data: validateData })
			: await RegisterUser.execute(validateData)

		return await generateAuthOutput(user)
	}

	static async signin (req: Request) {
		const validateData = validate({
			email: req.body.email,
			password: req.body.password
		}, {
			email: { required: true, rules: [Validation.isEmail] },
			password: { required: true, rules: [] }
		})

		const data = await AuthenticateUser.execute(validateData)
		const result = await generateAuthOutput(data)

		if (result) return result
		else throw new ValidationError([{
			messages: ['credential is incorrect'],
			field: 'password'
		}])
	}

	static async sendVerificationMail (req: Request) {
		const { email } = validate({
			email: req.body.email
		}, {
			email: { required: true, rules: [Validation.isEmail] }
		})

		const user = await FindUserByEmail.execute(email)
		if (!user) throw new ValidationError([{ field: 'email', messages: ['No account with such email exists'] }])

		return await SendVerificationEmail.execute(email)
	}

	static async verifyEmail (req: Request) {
		const { token } = validate({
			token: req.body.token
		}, {
			token: { required: true, rules: [] }
		})

		const data = await VerifyEmail.execute(token)
		return await generateAuthOutput(data)
	}
}