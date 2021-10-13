import { AddSchool, DeleteSchool, FindSchool, GetSchools, UpdateSchool } from '@modules/resources'
import { NotFoundError, QueryParams, Request, validate, Validation } from '@utils/commons'

export class SchoolController {
	static async FindSchool (req: Request) {
		return await FindSchool.execute(req.params.id)
	}

	static async GetSchools (req: Request) {
		const query = req.query as QueryParams
		return await GetSchools.execute(query)
	}

	static async CreateSchool (req: Request) {
		const data = validate({
			name: req.body.name
		}, {
			name: { required: true, rules: [Validation.isString, Validation.isLongerThanX(2)] }
		})

		return await AddSchool.execute(data)
	}

	static async UpdateSchool (req: Request) {
		const data = validate({
			name: req.body.name
		}, {
			name: { required: true, rules: [Validation.isString, Validation.isLongerThanX(2)] }
		})

		return await UpdateSchool.execute({ id: req.params.id, data })
	}

	static async DeleteSchool (req: Request) {
		const isDeleted = await DeleteSchool.execute(req.params.id)

		if (isDeleted) return isDeleted
		throw new NotFoundError()
	}
}