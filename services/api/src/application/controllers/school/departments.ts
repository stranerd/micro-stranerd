import {
	AddDepartment,
	DeleteDepartment,
	FindDepartment,
	FindFaculty,
	GetDepartments,
	UpdateDepartment
} from '@modules/school'
import { BadRequestError, QueryParams, Request, validate, Validation } from '@utils/commons'

export class DepartmentController {
	static async FindDepartment (req: Request) {
		return await FindDepartment.execute(req.params.id)
	}

	static async GetDepartments (req: Request) {
		const query = req.query as QueryParams
		return await GetDepartments.execute(query)
	}

	static async CreateDepartment (req: Request) {
		const data = validate({
			name: req.body.name,
			facultyId: req.body.facultyId
		}, {
			name: { required: true, rules: [Validation.isString, Validation.isLongerThanX(2)] },
			facultyId: { required: true, rules: [Validation.isString] }
		})
		const faculty = await FindFaculty.execute(data.facultyId)
		if (!faculty) throw new BadRequestError('faculty not found')

		return await AddDepartment.execute({ ...data, institutionId: faculty.institutionId })
	}

	static async UpdateDepartment (req: Request) {
		const data = validate({
			name: req.body.name
		}, {
			name: { required: true, rules: [Validation.isString, Validation.isLongerThanX(2)] }
		})

		const updatedDepartment = await UpdateDepartment.execute({ id: req.params.id, data })
		if (updatedDepartment) return updatedDepartment
		throw new BadRequestError('department not found')
	}

	static async DeleteDepartment (req: Request) {
		const isDeleted = await DeleteDepartment.execute(req.params.id)

		if (isDeleted) return isDeleted
		throw new BadRequestError('department not found')
	}
}