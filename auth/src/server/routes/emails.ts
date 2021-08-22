import { AuthTypes, makeController, Route, StatusCodes, validate, Validation, ValidationError } from '@utils/commons'
import { AuthController } from '../../controller/auth'
import { UserController } from '../../controller/user'
import { RegisterInput } from '../../application/domain'

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

			const userCredential: RegisterInput = {
				email: req.body.email,
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				password: req.body.password,
				photo: req.body.photo
			}

			const emailExist = await new AuthController().emailExist(userCredential.email, AuthTypes.email)

			const checkEmailExist = (email: string) => {
				return { valid: emailExist, error: emailExist ? email + ' already exists' : undefined }
			}

			const isLongerThan7 = (val: string) => Validation.isLongerThan(val, 7)
			const isLongerThan2 = (val: string) => Validation.isLongerThan(val, 2)
			const isShorterThan17 = (val: string) => Validation.isShorterThan(val, 17)
			const isUniqueInDb = (email: string) => checkEmailExist(email)

			const validateData = validate(userCredential, {
				email: { required: true, rules: [Validation.isEmail, isUniqueInDb] },
				password: { required: true, rules: [isLongerThan7, isShorterThan17] },
				photo: { required: false, rules: [Validation.isImage] },
				firstName: { required: true, rules: [isLongerThan2] },
				lastName: { required: true, rules: [isLongerThan2] }
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

const routes: Route[] = [
	emailSignIn,
	emailSignUp,
	sendVerificationEmail,
	verifyEmail
]
export default routes