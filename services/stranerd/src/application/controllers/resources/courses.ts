import { AddCourse, DeleteCourse, FindCourse, GetCourses, UpdateCourse } from '@modules/resources'
import { NotFoundError, QueryParams, Request, validate, Validation } from '@utils/commons'

export class CourseController {
	static async FindCourse (req: Request) {
		return await FindCourse.execute(req.params.id)
	}

	static async GetCourses (req: Request) {
		const query = req.query as QueryParams
		return await GetCourses.execute(query)
	}

	static async CreateCourse (req: Request) {
		const data = validate({
			name: req.body.name,
			institutionId: req.body.institutionId
		}, {
			name: { required: true, rules: [Validation.isString, Validation.isLongerThanX(2)] },
			institutionId: { required: true, rules: [Validation.isString] }
		})

		return await AddCourse.execute(data)
	}

	static async UpdateCourse (req: Request) {
		const data = validate({
			name: req.body.name,
			institutionId: req.body.institutionId
		}, {
			name: { required: true, rules: [Validation.isString, Validation.isLongerThanX(2)] },
			institutionId: { required: true, rules: [Validation.isString] }
		})

		return await UpdateCourse.execute({ id: req.params.id, data })
	}

	static async DeleteCourse (req: Request) {
		const isDeleted = await DeleteCourse.execute(req.params.id)

		if (isDeleted) return isDeleted
		throw new NotFoundError()
	}
}