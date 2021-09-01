import { QueryParams, Request } from '@utils/commons'
import { GetAnswers, GetQuestions } from '@modules/questions'
import { GetUsers } from '@modules/users'

export class SearchController {
	static async Search (req: Request) {
		const query: QueryParams = {
			search: req.params.query,
			limit: 10
		}

		const questions = await GetQuestions.execute(query)
		const answers = await GetAnswers.execute(query)
		const users = await GetUsers.execute(query)
		return { questions, answers, users }
	}
}