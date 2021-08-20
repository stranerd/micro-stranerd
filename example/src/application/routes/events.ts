import { EventTypes, makeController, Route, StatusCodes } from '@utils/commons'
import { publishers } from '@utils/events'

const fireEvent: Route = {
	path: '/events/:data',
	method: 'get',
	controllers: [
		makeController(async (req) => {
			await publishers[EventTypes.TEST].publish(req.params.data)
			return {
				status: StatusCodes.Ok,
				result: req.params.data
			}
		})
	]
}

const routes: Route[] = [fireEvent]
export default routes