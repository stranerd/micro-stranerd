import { isAuthenticated } from '@application/middlewares'
import { TokensUseCases } from '@modules/push'
import { makeController, Route, Schema, StatusCodes, validateReq } from '@utils/app/package'

const subscribeDevice: Route = {
	path: '/push/devices/subscribe',
	method: 'post',
	controllers: [
		isAuthenticated,
		makeController(async (req) => {
			const { token } = validateReq({
				token: Schema.string().min(1)
			}, req.body)
			const res = await TokensUseCases.update({ userId: req.authUser!.id, tokens: [token], add: true })
			return {
				status: StatusCodes.Ok,
				result: !!res
			}
		})
	]
}

const unsubscribeDevice: Route = {
	path: '/push/devices/unsubscribe',
	method: 'post',
	controllers: [
		isAuthenticated,
		makeController(async (req) => {
			const { token } = validateReq({
				token: Schema.string().min(1)
			}, req.body)
			const res = await TokensUseCases.update({ userId: req.authUser!.id, tokens: [token], add: false })
			return {
				status: StatusCodes.Ok,
				result: !!res
			}
		})
	]
}

export const pushRoutes: Route[] = [subscribeDevice, unsubscribeDevice]
