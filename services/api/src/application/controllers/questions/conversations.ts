import { Request, validate, Validation } from '@utils/app/package'
import { getConversationResponse } from '@utils/modules/questions/conversations'

export class ConversationsController {
	static async Converse (req: Request) {
		const { messages } = validate({
			messages: req.body.messages
		}, {
			messages: {
				required: true, rules: [
					Validation.hasMinOf(1),
					Validation.isArrayOf((v: string) => Validation.isString()(v).valid && Validation.isMinOf(1)(v).valid, 'strings'),
					(val: any) => val.length % 2 != 0 ? Validation.isValid(val) : Validation.isInvalid(['needs a question at the end'], val)
				]
			}
		})

		messages.push('')
		const prompt = messages.concat('').reduce(
			(acc, cur, idx) => `${acc}\n${idx % 2 === 0 ? 'Student' : 'Teacher'}: ${cur}`,
			'Pretend you are a teacher in a classroom. Answer with the best answers, providing all reasoning and logic between your answers.'
		)

		messages[messages.length - 1] = await getConversationResponse(prompt)
		return messages
	}
}