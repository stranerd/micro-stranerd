import { SearchModules } from '@modules/common'
import { Request } from '@utils/commons'

export class SearchController {
	static async Search (req: Request) {
		return await SearchModules.execute(req.params.query)
	}
}