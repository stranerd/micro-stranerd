import { FindTag, GetTags } from '@modules/questions'
import { QueryParams, Request } from '@utils/commons'

export class TagController {

	static async FindTag (req: Request) {
		return await FindTag.execute(req.params.id)
	}

	static async GetTags (req: Request) {

		const query = req.body as QueryParams
		return await GetTags.execute(query)
	}

	
}