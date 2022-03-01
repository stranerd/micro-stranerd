import { Request } from '@utils/commons'
import { GetAnswers, GetQuestions, QuestionType } from '@modules/questions'
import { GetUsers } from '@modules/users'
import { GetFlashCards, GetNotes, GetSets, GetTestPreps, GetVideos, SetType } from '@modules/study'

export class SearchController {
	static async Search (req: Request) {
		const searchTerm = req.query.search ?? ''
		const [questions, answers, users, videos, notes, sets, flashCards, testPreps] = await Promise.all([
			GetQuestions.execute({
				where: [{ field: 'data.type', value: QuestionType.users }],
				search: {
					value: searchTerm,
					fields: ['body']
				},
				limit: 15
			}),
			GetAnswers.execute({
				search: {
					value: searchTerm,
					fields: ['title', 'body']
				},
				limit: 15
			}),
			GetUsers.execute({
				search: {
					value: searchTerm,
					fields: ['bio.firstName', 'bio.lastName']
				},
				limit: 15
			}),
			GetVideos.execute({
				where: [{ field: 'isPublic', value: true }],
				search: {
					value: searchTerm,
					fields: ['title', 'description']
				},
				limit: 15
			}),
			GetNotes.execute({
				where: [{ field: 'isPublic', value: true }],
				search: {
					value: searchTerm,
					fields: ['title', 'description']
				},
				limit: 15
			}),
			GetSets.execute({
				where: [{ field: 'isPublic', value: true }, { field: 'data.type', value: SetType.users }],
				search: {
					value: searchTerm,
					fields: ['name']
				},
				limit: 15
			}),
			GetFlashCards.execute({
				where: [{ field: 'isPublic', value: true }],
				search: {
					value: searchTerm,
					fields: ['title', 'set']
				},
				limit: 15
			}),
			GetTestPreps.execute({
				search: {
					value: searchTerm,
					fields: ['name']
				},
				limit: 15
			})
		])
		return { questions, answers, users, videos, notes, sets, flashCards, testPreps }
	}
}