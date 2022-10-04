import { ChatMetasUseCases } from '@modules/messaging'
import { Conditions, QueryParams, Request } from '@utils/app/package'

export class ChatMetaController {
	static async getChatMeta (req: Request) {
		const query = req.query as QueryParams
		query.auth = [{ field: 'members', condition: Conditions.in, value: req.authUser!.id }]
		return await ChatMetasUseCases.get(query)
	}

	static async findChatMeta (req: Request) {
		const chatMeta = await ChatMetasUseCases.find(req.params.id)
		if (!chatMeta || !chatMeta.members.includes(req.authUser!.id)) return null
		return chatMeta
	}
}