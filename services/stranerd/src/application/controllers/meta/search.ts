import { Request } from '@utils/commons'
import { GetAnswers, GetQuestions } from '@modules/questions'
import { GetUsers } from '@modules/users'
import { GetFlashCards, GetNotes, GetSets, GetTestPreps, GetVideos } from '@modules/study'

export class SearchController {
	static async Search (req: Request) {
		const [questions, answers, users, videos, notes, sets, flashCards, testPreps] = await Promise.all([
			GetQuestions.execute({
				search: {
					value: req.params.search,
					fields: ['body', 'tags']
				},
				limit: 10
			}),
			GetAnswers.execute({
				search: {
					value: req.params.search,
					fields: ['title', 'body']
				},
				limit: 10
			}),
			GetUsers.execute({
				search: {
					value: req.params.search,
					fields: ['bio.firstName', 'bio.lastName']
				},
				limit: 10
			}),
			GetVideos.execute({
				search: {
					value: req.params.search,
					fields: ['title', 'description', 'tags']
				},
				limit: 10
			}),
			GetNotes.execute({
				search: {
					value: req.params.search,
					fields: ['title', 'description', 'tags']
				},
				limit: 10
			}),
			GetSets.execute({
				where: [{ field: 'isRoot', value: false }, { field: 'isPublic', value: true }],
				search: {
					value: req.params.search,
					fields: ['name', 'tags']
				},
				limit: 10
			}),
			GetFlashCards.execute({
				where: [{ field: 'isPublic', value: true }],
				search: {
					value: req.params.search,
					fields: ['title', 'set', 'tags']
				},
				limit: 10
			}),
			GetTestPreps.execute({
				search: {
					value: req.params.search,
					fields: ['name']
				},
				limit: 10
			})
		])
		return { questions, answers, users, videos, notes, sets, flashCards, testPreps }
	}
}