import { makeController, Route, StatusCodes } from '@utils/app/package'
import { NoteController } from '../../controllers/study/notes'
import { isAuthenticated } from '@application/middlewares'

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
			isAuthenticated,
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
			isAuthenticated,
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
			isAuthenticated,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await NoteController.DeleteNote(req)
				}
			})
		]
	}
]