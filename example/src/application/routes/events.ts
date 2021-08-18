import { makeController, Route, StatusCodes } from '@utils/commons'
import { publishers } from '@utils/events'

const fireEvent: Route = {
	path: '/events/:id',
	method: 'get',
	controllers: [
		makeController(async (req) => {
			await publishers.TEST.publish(req.params.id)
			return {
				status: StatusCodes.Ok,
				result: {}
			}
		})
	]
}


const routes: Route[]= [fireEvent]
export default routes