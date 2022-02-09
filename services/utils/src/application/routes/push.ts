import { AuthApps, makeController, requireAuthUser, Route, StatusCodes, validate, Validation } from '@utils/commons'
import { UpdateUserTokens } from '@modules/push'

const subscribeDevice: Route = {
	path: '/push/devices/subscribe',
	method: 'post',
	controllers: [
		requireAuthUser,
		makeController(async (req) => {
			const { app, token } = validate({
				app: req.body.app,
				token: req.body.token
			}, {
				app: {
					required: true,
					rules: [Validation.arrayContainsX(Object.values<string>(AuthApps), (cur, val) => cur === val)]
				},
				token: { required: true, rules: [Validation.isString, Validation.isLongerThanX(0)] }
			})
			const res = await UpdateUserTokens.execute({ userId: req.authUser!.id, app, tokens: [token], add: true })
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
			const { app, token } = validate({
				app: req.body.app,
				token: req.body.token
			}, {
				app: {
					required: true,
					rules: [Validation.arrayContainsX(Object.values<string>(AuthApps), (cur, val) => cur === val)]
				},
				token: { required: true, rules: [Validation.isString, Validation.isLongerThanX(0)] }
			})
			const res = await UpdateUserTokens.execute({ userId: req.authUser!.id, app, tokens: [token], add: false })
			return {
				status: StatusCodes.Ok,
				result: !!res
			}
		})
	]
}

const routes: Route[] = [subscribeDevice, unsubscribeDevice]
export default routes