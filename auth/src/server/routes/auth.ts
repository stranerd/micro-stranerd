import {
	makeController,
	requireAuthUser,
	Route,
	StatusCodes,
	validate,
	Validation,
	ValidationError
} from '@utils/commons'
import { AuthController } from '../../controller/auth'
import { UserController } from '../../controller/user'
import { SocialRegisterInput } from '../../application/domain'

const emailSignIn: Route = {
	path: '/emails/signin',
	method: 'post',
	controllers: [
		makeController(async (req) => {

			const userCredential = {
				email: req.body.email,
				password: req.body.password
			}

			const validateData = validate(userCredential, {
				email: { required: true, rules: [Validation.isEmail] },
				password: { required: true, rules: [] }
			})

			const result = await new AuthController().authenticateUser(validateData)

			if (result) {

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

		})
	]
}

const emailSignUp: Route = {
	path: '/emails/signup',
	method: 'post',
	controllers: [
		makeController(async (req) => {

			const userCredential: SocialRegisterInput = {
				email: req.body.email,
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				password: req.body.password,
				photo: null,
				type: 'email'
			}

			const emailExist = await new AuthController().emailExist(userCredential.email, userCredential.type)

			const checkEmailExist = (email: string) => {
				return { valid: emailExist, error: email + ' already exists' }
			}

			const isLongerThan7 = (val: string) => Validation.isLongerThan(val, 7)
			const isLongerThan2 = (val: string) => Validation.isLongerThan(val, 2)
			const isShorterThan17 = (val: string) => Validation.isShorterThan(val, 17)
			const isUniqueInDb = (email: string) => checkEmailExist(email)

			const validateData = validate(userCredential, {
				email: { required: true, rules: [Validation.isEmail, isUniqueInDb] },
				password: { required: true, rules: [isLongerThan7, isShorterThan17] },
				photo: { required: false, rules: [] },
				firstName: { required: true, rules: [isLongerThan2] },
				lastName: { required: true, rules: [isLongerThan2] },
				type: { required: true, rules: [isLongerThan2] }
			})

			const userData = await new UserController().getUserDetailsWithEmail(validateData.email)

			let result = {}

			if (userData) {
				result = await new AuthController().updateUserDetails(validateData)
			} else {
				result = await new AuthController().registerUser(validateData)
			}

			return {
				status: StatusCodes.Ok,
				result
			}
		})
	]
}

const sendVerificationEmail: Route = {
	path: '/emails/sendVerificationMail',
	method: 'post',
	controllers: [
		makeController(async (req) => {

			const reqData = {
				email: req.body.email
			}

			const validateData = validate(reqData, {
				email: { required: true, rules: [Validation.isEmail] }
			})

			const result = await new AuthController().sendVerificationMail(validateData.email)
			return {
				status: StatusCodes.Ok,
				result
			}
		})
	]

}

const verifyEmail: Route = {
	path: '/emails/verify',
	method: 'post',
	controllers: [
		makeController(async (req) => {

			const reqData = {
				token: req.body.token
			}

			const validateData = validate(reqData, {
				token: { required: true, rules: [] }
			})

			const result = await new AuthController().verifyEmail(validateData.token)

			return {
				status: StatusCodes.Ok,
				result
			}
		})
	]
}

const resetPasswordEmail: Route = {
	path: '/passwords/sendResetMail',
	method: 'post',
	controllers: [
		makeController(async (req) => {

			const reqData = {
				email: req.body.email
			}

			const validateData = validate(reqData, {
				email: { required: true, rules: [Validation.isEmail] }
			})

			const result = await new AuthController().sendPasswordResetMail(validateData.email)

			return {
				status: StatusCodes.Ok,
				result
			}
		})
	]
}

const resetPassword: Route = {
	path: '/passwords/reset',
	method: 'post',
	controllers: [
		makeController(async (req) => {

			const reqData = {
				token: req.body.token,
				password: req.body.password
			}

			const isLongerThan7 = (val: string) => Validation.isLongerThan(val, 7)
			const isShorterThan17 = (val: string) => Validation.isShorterThan(val, 17)

			const validateData = validate(reqData, {
				token: { required: true, rules: [] },
				password: { required: true, rules: [isLongerThan7, isShorterThan17] }
			})

			const result = await new AuthController().resetPassword(validateData)

			return {
				status: StatusCodes.Ok,
				result
			}
		})
	]
}

const updatePassword: Route = {
	path: '/passwords/update',
	method: 'post',
	controllers: [
		requireAuthUser,
		makeController(async (req) => {

			const authUser = req.authUser

			const reqData = {
				oldPassword: req.body.oldPassword,
				password: req.body.password,
				userId: authUser?.id
			}

			const isLongerThan7 = (val: string) => Validation.isLongerThan(val, 7)
			const isShorterThan17 = (val: string) => Validation.isShorterThan(val, 17)

			const validateData = validate(reqData, {
				oldPassword: { required: true, rules: [] },
				password: { required: true, rules: [isLongerThan7, isShorterThan17] },
				userId: { required: true, rules: [] }
			})

			const result = await new AuthController().updatePassword(validateData)

			return {
				status: StatusCodes.Ok,
				result
			}
		})
	]
}

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

const routes: Route[] = [
	emailSignIn,
	emailSignUp,
	token,
	logout,
	sendVerificationEmail,
	verifyEmail,
	resetPasswordEmail,
	resetPassword,
	googleSignIn,
	updatePassword
]
export default routes