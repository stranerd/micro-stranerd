import { Request, Schema, validateReq } from '@utils/app/package'
import { getConversationResponse } from '@utils/modules/questions/conversations'

export class ConversationsController {
	static async Converse(req: Request) {
		const { messages } = validateReq(
			{
				messages: Schema.array(Schema.string().min(1))
					.min(1)
					.custom(
						(v) => v.length % 2 != 0,
						'needs a question at the end'
					)
			},
			req.body
		)

		messages.push('')
		const prompt = messages
			.concat('')
			.reduce(
				(acc, cur, idx) =>
					`${acc}\n${idx % 2 === 0 ? 'Student' : 'Teacher'}: ${cur}`,
				'Pretend you are a teacher in a classroom. Answer with the best answers, providing all reasoning and logic between your answers.'
			)

		messages[messages.length - 1] = await getConversationResponse(prompt)
		return messages
	}
}
