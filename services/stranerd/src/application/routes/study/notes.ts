import { makeController, requireAuthUser, Route, StatusCodes } from '@utils/commons'
import { NoteController } from '../../controllers/study/notes'
import { isTutor } from '@application/middlewares/isTutor'

export const notesRoutes: Route[] = [
	{
		path: '/study/notes',
		method: 'get',
		controllers: [
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await NoteController.GetNote(req)
				}
			})
		]
	},
	{
		path: '/study/notes/:id',
		method: 'get',
		controllers: [
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await NoteController.FindNote(req)
				}
			})
		]
	},
	{
		path: '/study/notes/:id',
		method: 'put',
		controllers: [
			requireAuthUser,
			isTutor,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await NoteController.UpdateNote(req)
				}
			})
		]
	},
	{
		path: '/study/notes',
		method: 'post',
		controllers: [
			requireAuthUser,
			isTutor,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await NoteController.CreateNote(req)
				}
			})
		]
	},
	{
		path: '/study/notes/:id',
		method: 'delete',
		controllers: [
			requireAuthUser,
			isTutor,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await NoteController.DeleteNote(req)
				}
			})
		]
	}
]