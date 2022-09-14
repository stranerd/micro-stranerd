import { ChatMetasUseCases } from '@modules/messaging'
import { Conditions, QueryParams, Request } from '@utils/app/package'

export class ChatMetaController {
	static async getChatMeta (req: Request) {
		const query = req.query as QueryParams
		query.auth = [{ field: 'members', condition: Conditions.in, value: req.authUser!.id }]
		return await ChatMetasUseCases.get(query)
	}

	static async findChatMeta (req: Request) {
		return await ChatMetasUseCases.find({ id: req.params.id, userId: req.authUser!.id })
	}
}