import { makeController, Route, StatusCodes } from '@utils/app/package'
import { FlashCardController } from '../../controllers/study/flashCards'
import { isAuthenticated } from '@application/middlewares'

export const flashcardsRoutes: Route[] = [
	{
		path: '/study/flashCards',
		method: 'get',
		controllers: [
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await FlashCardController.GetFlashCard(req)
				}
			})
		]
	},
	{
		path: '/study/flashCards/:id',
		method: 'get',
		controllers: [
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await FlashCardController.FindFlashCard(req)
				}
			})
		]
	},
	{
		path: '/study/flashCards/:id',
		method: 'put',
		controllers: [
			isAuthenticated,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await FlashCardController.UpdateFlashCard(req)
				}
			})
		]
	},
	{
		path: '/study/flashCards',
		method: 'post',
		controllers: [
			isAuthenticated,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await FlashCardController.CreateFlashCard(req)
				}
			})
		]
	},
	{
		path: '/study/flashCards/:id',
		method: 'delete',
		controllers: [
			isAuthenticated,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await FlashCardController.DeleteFlashCard(req)
				}
			})
		]
	}
]