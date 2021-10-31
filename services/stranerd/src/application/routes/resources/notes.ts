import { makeController, requireAuthUser, Route, StatusCodes } from '@utils/commons'
import { NoteController } from '../../controllers/resources/notes'
import { isTutor } from '@application/middlewares/isTutor'

export const notesRoutes: Route[] = [
	{
		path: '/resources/notes',
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
		path: '/resources/notes/:id',
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
		path: '/resources/notes/:id',
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
		path: '/resources/notes',
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
		path: '/resources/notes/:id',
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