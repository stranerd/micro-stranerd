import { FindUser, FindUserByEmail, ResetPassword, SendPasswordResetMail, UpdatePassword } from '@modules/index'
import { Request, validate, Validation, ValidationError } from '@utils/commons'
import { generateAuthOutput } from '@utils/modules/auth'
import { hashCompare } from '@utils/hash'
import { BadRequestError } from '@stranerd/api-commons'

export class PasswordsController {
	static async sendResetMail (req: Request) {
		const { email } = validate({
			email: req.body.email
		}, {
			email: { required: true, rules: [Validation.isEmail] }
		})

		const user = await FindUserByEmail.execute(email)
		if (!user) throw new ValidationError([{ field: 'email', messages: ['No account with such email exists'] }])

		return await SendPasswordResetMail.execute(email)
	}

	static async resetPassword (req: Request) {
		const isLongerThan7 = (val: string) => Validation.isLongerThan(val, 7)
		const isShorterThan17 = (val: string) => Validation.isShorterThan(val, 17)

		const validateData = validate({
			token: req.body.token,
			password: req.body.password
		}, {
			token: { required: true, rules: [] },
			password: { required: true, rules: [isLongerThan7, isShorterThan17] }
		})

		const data = await ResetPassword.execute(validateData)
		return generateAuthOutput(data)
	}

	static async updatePassword (req: Request) {
		const userId = req.authUser!.id
		const isLongerThan7 = (val: string) => Validation.isLongerThan(val, 7)
		const isShorterThan17 = (val: string) => Validation.isShorterThan(val, 17)

		const { oldPassword, password } = validate({
			oldPassword: req.body.oldPassword,
			password: req.body.password
		}, {
			oldPassword: { required: true, rules: [] },
			password: { required: true, rules: [isLongerThan7, isShorterThan17] }
		})

		const user = await FindUser.execute(userId)
		if (!user) throw new BadRequestError('No account with such id exists')

		const match = await hashCompare(oldPassword, user.password ?? '')
		if (!match) throw new ValidationError([{ messages: ['old password does not match'], field: 'oldPassword' }])

		return await UpdatePassword.execute({ userId, password })
	}
}