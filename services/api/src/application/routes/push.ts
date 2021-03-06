import { makeController, requireAuthUser, Route, StatusCodes, validate, Validation } from '@utils/commons'
import { TokensUseCases } from '@modules/push'

const subscribeDevice: Route = {
	path: '/push/devices/subscribe',
	method: 'post',
	controllers: [
		requireAuthUser,
		makeController(async (req) => {
			const { token } = validate({
				token: req.body.token
			}, {
				token: { required: true, rules: [Validation.isString, Validation.isLongerThanX(0)] }
			})
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
		requireAuthUser,
		makeController(async (req) => {
			const { token } = validate({
				token: req.body.token
			}, {
				token: { required: true, rules: [Validation.isString, Validation.isLongerThanX(0)] }
			})
			const res = await TokensUseCases.update({ userId: req.authUser!.id, tokens: [token], add: false })
			return {
				status: StatusCodes.Ok,
				result: !!res
			}
		})
	]
}

export const pushRoutes: Route[] = [subscribeDevice, unsubscribeDevice]
