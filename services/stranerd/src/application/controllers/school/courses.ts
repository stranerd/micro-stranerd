import { AddCourse, DeleteCourse, FindCourse, FindDepartment, GetCourses, UpdateCourse } from '@modules/school'
import { BadRequestError, QueryParams, Request, validate, Validation } from '@utils/commons'

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
			institutionId: req.body.institutionId,
			departmentId: req.body.departmentId
		}, {
			name: { required: true, rules: [Validation.isString, Validation.isLongerThanX(2)] },
			institutionId: { required: true, rules: [Validation.isString] },
			departmentId: { required: false, rules: [Validation.isString] }
		})
		const department = !data.departmentId ? null : await FindDepartment.execute(data.departmentId)
		if (data.departmentId) {
			if (!department) throw new BadRequestError('department not found')
			if (department.institutionId !== data.institutionId) throw new BadRequestError('mismatched department and institution')
		}

		return await AddCourse.execute({
			...data,
			departmentId: department?.id ?? null,
			facultyId: department?.facultyId ?? null
		})
	}

	static async UpdateCourse (req: Request) {
		const data = validate({
			name: req.body.name
		}, {
			name: { required: true, rules: [Validation.isString, Validation.isLongerThanX(2)] }
		})

		const updatedCourse = await UpdateCourse.execute({ id: req.params.id, data })
		if (updatedCourse) return updatedCourse
		throw new BadRequestError('course not found')
	}

	static async DeleteCourse (req: Request) {
		const isDeleted = await DeleteCourse.execute(req.params.id)

		if (isDeleted) return isDeleted
		throw new BadRequestError('course not found')
	}
}