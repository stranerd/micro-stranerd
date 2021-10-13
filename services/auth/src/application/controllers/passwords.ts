import { FindUser, FindUserByEmail, ResetPassword, SendPasswordResetMail, UpdatePassword } from '@modules/index'
import { generateAuthOutput } from '@utils/modules/auth'
import { hashCompare } from '@utils/hash'
import { BadRequestError, Request, validate, Validation, ValidationError } from '@utils/commons'

export class PasswordsController {
	static async sendResetMail (req: Request) {
		const { email, redirectUrl } = validate({
			email: req.body.email,
			redirectUrl: req.body.redirectUrl
		}, {
			email: { required: true, rules: [Validation.isEmail] },
			redirectUrl: { required: true, rules: [Validation.isString] }
		})

		const user = await FindUserByEmail.execute(email)
		if (!user) throw new ValidationError([{ field: 'email', messages: ['No account with such email exists'] }])

		return await SendPasswordResetMail.execute({ email, redirectUrl })
	}

	static async resetPassword (req: Request) {
		const validateData = validate({
			token: req.body.token,
			password: req.body.password
		}, {
			token: { required: true, rules: [Validation.isString] },
			password: {
				required: true,
				rules: [Validation.isString, Validation.isLongerThanX(7), Validation.isShorterThanX(17)]
			}
		})

		const data = await ResetPassword.execute(validateData)
		return await generateAuthOutput(data)
	}

	static async updatePassword (req: Request) {
		const userId = req.authUser!.id
		const { oldPassword, password } = validate({
			oldPassword: req.body.oldPassword,
			password: req.body.password
		}, {
			oldPassword: { required: true, rules: [Validation.isString] },
			password: {
				required: true,
				rules: [Validation.isString, Validation.isLongerThanX(7), Validation.isShorterThanX(17)]
			}
		})

		const user = await FindUser.execute(userId)
		if (!user) throw new BadRequestError('No account with such id exists')

		const match = await hashCompare(oldPassword, user.password ?? '')
		if (!match) throw new ValidationError([{ messages: ['old password does not match'], field: 'oldPassword' }])

		return await UpdatePassword.execute({ userId, password })
	}
}