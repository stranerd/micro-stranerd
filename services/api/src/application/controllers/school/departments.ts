import { DepartmentsUseCases, FacultiesUseCases } from '@modules/school'
import { BadRequestError, QueryParams, Request, validate, Validation } from '@utils/commons'
import { TagsUseCases, TagTypes } from '@modules/interactions'

export class DepartmentController {
	static async FindDepartment (req: Request) {
		return await DepartmentsUseCases.find(req.params.id)
	}

	static async GetDepartments (req: Request) {
		const query = req.query as QueryParams
		return await DepartmentsUseCases.get(query)
	}

	static async CreateDepartment (req: Request) {
		const data = validate({
			name: req.body.name,
			facultyId: req.body.facultyId,
			tagId: req.body.tagId
		}, {
			name: { required: true, rules: [Validation.isString, Validation.isLongerThanX(2)] },
			facultyId: { required: true, rules: [Validation.isString] },
			tagId: { required: true, rules: [Validation.isString] }
		})
		const faculty = await FacultiesUseCases.find(data.facultyId)
		if (!faculty) throw new BadRequestError('faculty not found')
		const tag = await TagsUseCases.find(data.tagId)
		if (!tag || tag.type !== TagTypes.departments) throw new BadRequestError('invalid tagId')

		return await DepartmentsUseCases.add({ ...data, institutionId: faculty.institutionId })
	}

	static async UpdateDepartment (req: Request) {
		const data = validate({
			name: req.body.name,
			tagId: req.body.tagId
		}, {
			name: { required: true, rules: [Validation.isString, Validation.isLongerThanX(2)] },
			tagId: { required: true, rules: [Validation.isString] }
		})
		const tag = await TagsUseCases.find(data.tagId)
		if (!tag || tag.type !== TagTypes.departments) throw new BadRequestError('invalid tagId')

		const updatedDepartment = await DepartmentsUseCases.update({ id: req.params.id, data })
		if (updatedDepartment) return updatedDepartment
		throw new BadRequestError('department not found')
	}

	static async DeleteDepartment (req: Request) {
		const isDeleted = await DepartmentsUseCases.delete(req.params.id)

		if (isDeleted) return isDeleted
		throw new BadRequestError('department not found')
	}
}