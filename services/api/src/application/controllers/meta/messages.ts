import { Request, validate, Validation } from '@utils/app/package'
import { MessageType, sendNewMessageEmail } from '@utils/modules/meta/messages'

export class MessageController {
	static async createMessage (req: Request) {
		const isSchoolType = req.body.data?.type === MessageType.school
		const {
			firstName, lastName, email, country, phone, message,
			school, position
		} = validate({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			phone: req.body.phone,
			country: req.body.country,
			message: req.body.message,
			type: req.body.data?.type,
			school: req.body.data?.school,
			position: req.body.data?.position
		}, {
			firstName: { required: true, rules: [Validation.isString, Validation.isLongerThanX(0)] },
			lastName: { required: true, rules: [Validation.isString, Validation.isLongerThanX(0)] },
			email: { required: true, rules: [Validation.isEmail] },
			phone: {
				required: true, rules: [Validation.isString, (phone: any) => {
					const isValidPhone = phone?.startsWith('+') && Validation.isNumber(parseInt(phone?.split('+')?.[1])).valid
					return isValidPhone ? Validation.isValid() : Validation.isInvalid('invalid phone')
				}]
			},
			country: { required: true, rules: [Validation.isString, Validation.isLongerThanX(0)] },
			message: { required: true, rules: [Validation.isString, Validation.isLongerThanX(0)] },
			type: {
				required: true,
				rules: [Validation.isString, Validation.arrayContainsX(Object.values(MessageType), (cur, val) => cur === val)]
			},
			school: { required: isSchoolType, rules: [Validation.isString, Validation.isLongerThanX(0)] },
			position: { required: isSchoolType, rules: [Validation.isString, Validation.isLongerThanX(0)] }
		})

		await sendNewMessageEmail({
			firstName, lastName, email, phone, country, message,
			data: isSchoolType ? { type: MessageType.school, school, position } : { type: MessageType.student }
		})

		return true
	}
}