import { makeController, Route, StatusCodes, validate, Validation } from '@utils/commons'

const resolve: Route = {
	path: '/validate/',
	method: 'post',
	controllers: [
		makeController(async (req) => {
			const isLongerThan2 = (val: string) => Validation.isLongerThan(val, 2)
			const isAtLeast18 = (val: number) => Validation.isMoreThan(val, 17)
			const { email, name, image, age } = req.body
			const data = validate({ email, name, image, age }, {
				email: { required: true, rules: [Validation.isEmail] },
				image: { required: true, rules: [Validation.isImage] },
				name: { required: true, rules: [isLongerThan2] },
				age: { required: true, rules: [isAtLeast18] }
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