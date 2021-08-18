import { getCacheInstance, makeController, Route, StatusCodes } from '@utils/commons'

const getCache: Route = {
	path: '/cache/',
	method: 'get',
	controllers: [
		makeController(async () => {
			const data = await getCacheInstance.get('example-data')
			return {
				status: StatusCodes.Ok,
				result: data
			}
		})
	]
}

const cacheData: Route = {
	path: '/cache/:data',
	method: 'get',
	controllers: [
		makeController(async (req) => {
			await getCacheInstance.set('example-data', req.params.data, 10)
			return {
				status: StatusCodes.Ok,
				result: req.params.data
			}
		})
	]
}

const routes: Route[] = [getCache, cacheData]
export default routes