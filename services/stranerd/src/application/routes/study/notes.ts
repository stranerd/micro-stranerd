import { makeController, requireAuthUser, Route, StatusCodes } from '@utils/commons'
import { NoteController } from '../../controllers/study/notes'
import { isAdmin } from '@application/middlewares/isAdmin'

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
			isAdmin,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await NoteController.DeleteNote(req)
				}
			})
		]
	}
]