import { makeController, Route, StatusCodes } from '@utils/commons'
import { EmailsController } from '../../controllers/auth/emails'

const emailSignIn: Route = {
	path: '/auth/emails/signin',
	method: 'post',
	controllers: [
		makeController(async (req) => {
			return {
				status: StatusCodes.Ok,
				result: await EmailsController.signin(req)
			}
		})
	]
}

const emailSignUp: Route = {
	path: '/auth/emails/signup',
	method: 'post',
	controllers: [
		makeController(async (req) => {
			return {
				status: StatusCodes.Ok,
				result: await EmailsController.signup(req)
			}
		})
	]
}

const sendVerificationEmail: Route = {
	path: '/auth/emails/verify/mail',
	method: 'post',
	controllers: [
		makeController(async (req) => {
			return {
				status: StatusCodes.Ok,
				result: await EmailsController.sendVerificationMail(req)
			}
		})
	]
}

const verifyEmail: Route = {
	path: '/auth/emails/verify',
	method: 'post',
	controllers: [
		makeController(async (req) => {
			return {
				status: StatusCodes.Ok,
				result: await EmailsController.verifyEmail(req)
			}
		})
	]
}

export const emailRoutes = [emailSignIn, emailSignUp, sendVerificationEmail, verifyEmail]