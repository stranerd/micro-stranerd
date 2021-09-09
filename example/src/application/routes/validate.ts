import { makeController, Route, StatusCodes, validate, Validation } from '@utils/commons'

const resolve: Route = {
	path: '/validate/',
	method: 'post',
	controllers: [
		makeController(async (req) => {
			const { email, name, image, age } = req.body
			const data = validate({ email, name, image, age }, {
				email: { required: true, rules: [Validation.isEmail] },
				image: { required: true, rules: [Validation.isImage] },
				name: { required: true, rules: [Validation.isString, Validation.isLongerThanX(2)] },
				age: { required: true, rules: [Validation.isNumber, Validation.isMoreThanX(17)] }
			})
			return {
				status: StatusCodes.Ok,
				result: data
			}
		})
	]
}

const routes: Route[] = [resolve]
export default routes