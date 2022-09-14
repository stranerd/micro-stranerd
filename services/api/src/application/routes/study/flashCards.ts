import { makeController, requireAuthUser, Route, StatusCodes } from '@utils/app/package'
import { FlashCardController } from '../../controllers/study/flashCards'

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
			requireAuthUser,
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
			requireAuthUser,
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
			requireAuthUser,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await FlashCardController.DeleteFlashCard(req)
				}
			})
		]
	}
]