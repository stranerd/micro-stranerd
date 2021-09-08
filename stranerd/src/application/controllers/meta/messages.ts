import { Request, validate, Validation } from '@utils/commons'
import { sendNewMessageEmail } from '@utils/modules/meta/messages'

export class MessageController {
	static async createMessage (req: Request) {
		const isLongerThan0 = (val: string) => Validation.isLongerThan(val, 0)
		const isLongerThan2 = (val: string) => Validation.isLongerThan(val, 2)

		const data = validate({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			message: req.body.message
		}, {
			firstName: { required: true, rules: [isLongerThan2] },
			lastName: { required: true, rules: [isLongerThan2] },
			email: { required: true, rules: [Validation.isEmail] },
			message: { required: true, rules: [isLongerThan0] }
		})

		await sendNewMessageEmail(data)

		return true
	}
}