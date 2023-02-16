import { Request, Schema, validateReq, Validation } from '@utils/app/package'
import { MessageType, sendNewMessageEmail } from '@utils/modules/meta/messages'

export class MessageController {
	static async createMessage (req: Request) {
		const data = validateReq({
			firstName: Schema.string().min(1),
			lastName: Schema.string().min(1),
			email: Schema.string().email(),
			phone: Schema.any().addRule(Validation.isValidPhone()),
			country: Schema.string().min(1),
			message: Schema.string().min(1),
			data: Schema.or([
				Schema.object({
					type: Schema.any<typeof MessageType.student>().eq(MessageType.student),
				}),
				Schema.object({
					type: Schema.any<typeof MessageType.school>().eq(MessageType.school),
					school: Schema.string().min(1),
					position: Schema.string().min(1),
				})
			])
		}, req.body)

		await sendNewMessageEmail(data)

		return true
	}
}