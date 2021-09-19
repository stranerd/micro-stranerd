import { FindChatMeta, GetChatsMeta } from '@modules/sessions'
import { QueryParams, Request } from '@utils/commons'

export class ChatMetaController {
	static async getChatMeta (req: Request) {
		const query = req.query as QueryParams
		query.auth = [{ field: 'userId', value: req.authUser!.id }]
		return await GetChatsMeta.execute(query)
	}

	static async findChatMeta (req: Request) {
		return await FindChatMeta.execute({ id: req.params.id, userId: req.authUser?.id! })
	}
}