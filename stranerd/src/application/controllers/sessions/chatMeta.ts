import { GetPersonalChatsMeta } from '@modules/sessions'
import { QueryParams, Request } from '@utils/commons'

export class ChatMetaController {
	static async getChatMeta (req: Request) {
		const query = req.body as QueryParams
		return await GetPersonalChatsMeta.execute(query)
	}

}