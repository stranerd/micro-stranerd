import { makeController, Route, StatusCodes, requireAuthUser } from '@utils/commons'
import { AuthController } from '../../controller/auth'

const emailAuthenthecate: Route = {
	path: '/emailAuthenthecate',
	method: 'post',
	controllers: [
		makeController(async (req) => {
			
			const userCredential = {
				email: req.body.email,
				password: req.body.password
			}
			const result = await new AuthController().authenticateUser(userCredential)
			return {
				status: StatusCodes.Ok,
				result
			}
		})
	]
}


const authenticate: Route = {
	path: '/authenticate',
	method: 'post',
	controllers: [
		makeController(async (req) => {
			
			const userCredential = {
				email: req.body.email,
				name: req.body.name,
				password: req.body.password,
				photoUrl: req.body.photoUrl,
				type: req.body.type
			}
			const result = await new AuthController().registerUser(userCredential)
			return {
				status: StatusCodes.Ok,
				result
			}
		})
	]
}


const token: Route = {
	path: '/token',
	method: 'post',
	controllers: [
		makeController(async (req) => {

			const accessToken = req.headers.AccessToken
			const refreshToken = req.headers.RefreshToken
			
			const tokens = {
				accessToken,
				refreshToken
			}

			const result = await new AuthController().refreshToken(tokens)
			return {
				status: StatusCodes.Ok,
				result
			}
		})
	]
}


const logout: Route = {
	path: '/signout',
	method: 'post',
	controllers: [
		requireAuthUser,
		makeController(async (req) => {

			const authUser = req.authUser
			
			const result = await new AuthController().logoutUser(authUser?.id)
			return {
				status: StatusCodes.Ok,
				result
			}
		})
	]
}


const routes: Route[]= [emailAuthenthecate, authenticate,token, logout]
export default routes