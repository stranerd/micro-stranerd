import { Request } from '@utils/commons'
import { GetAnswers, GetQuestions } from '@modules/questions'
import { GetUsers } from '@modules/users'
import { GetFlashCards, GetNotes, GetPlaylists, GetSets, GetTestPreps, GetVideos } from '@modules/study'

export class SearchController {
	static async Search (req: Request) {
		const searchTerm = req.query.search ?? ''
		const [questions, answers, users, videos, notes, sets, flashCards, playlists, testPreps] = await Promise.all([
			GetQuestions.execute({
				search: {
					value: searchTerm,
					fields: ['body', 'tags']
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
					fields: ['title', 'description', 'tags']
				},
				limit: 15
			}),
			GetNotes.execute({
				where: [{ field: 'isPublic', value: true }],
				search: {
					value: searchTerm,
					fields: ['title', 'description', 'tags']
				},
				limit: 15
			}),
			GetSets.execute({
				where: [{ field: 'isPublic', value: true }],
				search: {
					value: searchTerm,
					fields: ['name', 'tags']
				},
				limit: 15
			}),
			GetFlashCards.execute({
				where: [{ field: 'isPublic', value: true }],
				search: {
					value: searchTerm,
					fields: ['title', 'set', 'tags']
				},
				limit: 15
			}),
			GetPlaylists.execute({
				where: [{ field: 'isPublic', value: true }],
				search: {
					value: searchTerm,
					fields: ['title', 'description', 'tags']
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
		return { questions, answers, users, videos, notes, sets, flashCards, playlists, testPreps }
	}
}