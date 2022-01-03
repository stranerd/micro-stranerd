import { Request } from '@utils/commons'
import { GetAnswers, GetQuestions } from '@modules/questions'
import { GetUsers } from '@modules/users'
import { GetFlashCards, GetNotes, GetSets, GetTestPreps, GetVideos } from '@modules/study'

export class SearchController {
	static async Search (req: Request) {
		const searchTerm = req.query.search ?? ''
		const [questions, answers, users, videos, notes, sets, flashCards, testPreps] = await Promise.all([
			GetQuestions.execute({
				search: {
					value: searchTerm,
					fields: ['body', 'tags']
				},
				limit: 10
			}),
			GetAnswers.execute({
				search: {
					value: searchTerm,
					fields: ['title', 'body']
				},
				limit: 10
			}),
			GetUsers.execute({
				search: {
					value: searchTerm,
					fields: ['bio.firstName', 'bio.lastName']
				},
				limit: 10
			}),
			GetVideos.execute({
				search: {
					value: searchTerm,
					fields: ['title', 'description', 'tags']
				},
				limit: 10
			}),
			GetNotes.execute({
				search: {
					value: searchTerm,
					fields: ['title', 'description', 'tags']
				},
				limit: 10
			}),
			GetSets.execute({
				where: [{ field: 'isRoot', value: false }, { field: 'isPublic', value: true }],
				search: {
					value: searchTerm,
					fields: ['name', 'tags']
				},
				limit: 10
			}),
			GetFlashCards.execute({
				where: [{ field: 'isPublic', value: true }],
				search: {
					value: searchTerm,
					fields: ['title', 'set', 'tags']
				},
				limit: 10
			}),
			GetTestPreps.execute({
				search: {
					value: searchTerm,
					fields: ['name']
				},
				limit: 10
			})
		])
		return { questions, answers, users, videos, notes, sets, flashCards, testPreps }
	}
}