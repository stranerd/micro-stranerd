import { Request, validate, Validation } from '@utils/commons'
import { sendNewMessageEmail } from '@utils/modules/meta/messages'

export class MessageController {
	static async createMessage (req: Request) {
		const data = validate({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			message: req.body.message
		}, {
			firstName: { required: true, rules: [Validation.isLongerThanX(2)] },
			lastName: { required: true, rules: [Validation.isLongerThanX(2)] },
			email: { required: true, rules: [Validation.isEmail] },
			message: { required: true, rules: [Validation.isLongerThanX(0)] }
		})

		await sendNewMessageEmail(data)

		return true
	}
}