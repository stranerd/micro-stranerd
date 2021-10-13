import { makeController, Route, StatusCodes } from '@utils/commons'
import { EmailsController } from '../controllers/'

const emailSignIn: Route = {
	path: '/emails/signin',
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
	path: '/emails/signup',
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
	path: '/emails/verify/mail',
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
	path: '/emails/verify',
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

const routes: Route[] = [emailSignIn, emailSignUp, sendVerificationEmail, verifyEmail]
export default routes