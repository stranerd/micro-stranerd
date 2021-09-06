import { GetChatsMeta } from '@modules/sessions'
import { Conditions, QueryParams, Request } from '@utils/commons'

export class ChatMetaController {
	static async getChatMeta (req: Request) {
		const query = req.body as QueryParams
		query.whereType = 'and'
		if (!query.where) query.where = []
		const ofUser = query.where.find((q) => q.field === 'ownerId')
		if (ofUser) {
			ofUser.condition = Conditions.eq
			ofUser.value = req.authUser!.id
		} else query.where.push({
			field: 'ownerId', condition: Conditions.eq, value: req.authUser!.id
		})
		return await GetChatsMeta.execute(query)
	}
}