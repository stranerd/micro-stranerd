import { AddFaculty, DeleteFaculty, FindFaculty, GetFaculties, UpdateFaculty } from '@modules/school'
import { NotFoundError, QueryParams, Request, validate, Validation } from '@utils/commons'

export class FacultyController {
	static async FindFaculty (req: Request) {
		return await FindFaculty.execute(req.params.id)
	}

	static async GetFaculties (req: Request) {
		const query = req.query as QueryParams
		return await GetFaculties.execute(query)
	}

	static async CreateFaculty (req: Request) {
		const data = validate({
			name: req.body.name,
			institutionId: req.body.institutionId
		}, {
			name: { required: true, rules: [Validation.isString, Validation.isLongerThanX(2)] },
			institutionId: { required: true, rules: [Validation.isString] }
		})

		return await AddFaculty.execute(data)
	}

	static async UpdateFaculty (req: Request) {
		const data = validate({
			name: req.body.name
		}, {
			name: { required: true, rules: [Validation.isString, Validation.isLongerThanX(2)] }
		})

		const updatedFaculty = await UpdateFaculty.execute({ id: req.params.id, data })
		if (updatedFaculty) return updatedFaculty
		throw new NotFoundError()
	}

	static async DeleteFaculty (req: Request) {
		const isDeleted = await DeleteFaculty.execute(req.params.id)

		if (isDeleted) return isDeleted
		throw new NotFoundError()
	}
}