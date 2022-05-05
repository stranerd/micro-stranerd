import { ChatMetasUseCases } from '@modules/sessions'
import { QueryParams, Request } from '@utils/commons'

export class ChatMetaController {
	static async getChatMeta (req: Request) {
		const query = req.query as QueryParams
		query.auth = [{ field: 'ownerId', value: req.authUser!.id }]
		return await ChatMetasUseCases.get(query)
	}

	static async findChatMeta (req: Request) {
		return await ChatMetasUseCases.find({ id: req.params.id, userId: req.authUser?.id! })
	}
}