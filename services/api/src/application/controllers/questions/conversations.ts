import { Request, validate, Validation } from '@utils/app/package'
import { getConversationResponse } from '@utils/modules/questions/conversations'

export class ConversationsController {
	static async Converse (req: Request) {
		const { messages } = validate({
			messages: req.body.messages
		}, {
			messages: {
				required: true, rules: [
					Validation.hasMoreThanX(0),
					Validation.isArrayOfX((v: string) => Validation.isString(v).valid && Validation.isLongerThan(v, 0).valid, 'strings'),
					(val) => val.length % 2 != 0 ? Validation.isValid() : Validation.isInvalid('needs a question at the end')
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