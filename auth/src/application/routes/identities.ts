import { makeController, Route, StatusCodes, validate } from '@utils/commons'
import { AuthController } from '../controller/auth'

const googleSignIn: Route = {
	path: '/identities/google',
	method: 'post',
	controllers: [
		makeController(async (req) => {

			const reqData = {
				idToken: req.body.idToken
			}

			const validateData = validate(reqData, {
				idToken: { required: true, rules: [] }
			})

			const result = await new AuthController().googleSignIn(validateData.idToken)

			return {
				status: StatusCodes.Ok,
				result
			}
		})
	]
}

const routes: Route[] = [
	googleSignIn
]
export default routes