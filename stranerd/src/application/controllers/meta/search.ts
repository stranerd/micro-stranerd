import { Request } from '@utils/commons'
import { GetAnswers, GetQuestions } from '@modules/questions'
import { GetUsers } from '@modules/users'

export class SearchController {
	static async Search (req: Request) {
		const questions = await GetQuestions.execute({
			search: {
				value: req.params.search,
				fields: ['body']
			},
			limit: 10
		})
		const answers = await GetAnswers.execute({
			search: {
				value: req.params.search,
				fields: ['title', 'body']
			},
			limit: 10
		})
		const users = await GetUsers.execute({
			search: {
				value: req.params.search,
				fields: ['bio.firstName', 'bio.lastName']
			},
			limit: 10
		})
		return { questions, answers, users }
	}
}