import { GetChatsMeta } from '@modules/sessions'
import { QueryParams, Request } from '@utils/commons'

export class ChatMetaController {
	static async getChatMeta (req: Request) {
		const query = req.body as QueryParams
		query.auth = [{ field: 'userId', value: req.authUser!.id }]
		return await GetChatsMeta.execute(query)
	}
}