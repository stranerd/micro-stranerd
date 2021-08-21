import { makeController, requireAuthUser, Route, StatusCodes,Validation, validate, ValidationError } from '@utils/commons'
import { AuthController } from '../../controller/auth'

const emailAuthenticate: Route = {
	path: 'emails/signin',
	method: 'post',
	controllers: [
		makeController(async (req) => {

			const userCredential = {
				email: req.body.email,
				password: req.body.password
			}

			const isLongerThan8 = (val: string) => Validation.isLongerThan(val, 8)
           
			const validateData = validate(userCredential,{
				email: { required: true, rules: [Validation.isEmail] },
				password: {required: true, rules: [isLongerThan8]}
			})

			 if(validateData){

				const result = await new AuthController().authenticateUser(userCredential)
				if(result) {
   
					return {
					   status: StatusCodes.Ok,
					   result
					 } 
   
			   } else {
   
				   const error = {
					   messages: ['credential is incorrect'],
					   field: 'password'
				   }
   
				   throw new ValidationError([error])
			   }

			 }else{
                 
				const error = {
					messages: ['validation error'],
					field: 'password'
				}

				throw new ValidationError([error])
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
				firstName: req.body.firstName,
				lastName: req.body.lastName,
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

const routes: Route[] = [emailAuthenticate, authenticate, token, logout]
export default routes