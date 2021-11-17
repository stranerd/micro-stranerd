import {
	AddInstitution,
	DeleteInstitution,
	FindInstitution,
	GetInstitutions,
	UpdateInstitution
} from '@modules/resources'
import { NotFoundError, QueryParams, Request, validate, Validation } from '@utils/commons'

export class InstitutionController {
	static async FindInstitution (req: Request) {
		return await FindInstitution.execute(req.params.id)
	}

	static async GetInstitutions (req: Request) {
		const query = req.query as QueryParams
		return await GetInstitutions.execute(query)
	}

	static async CreateInstitution (req: Request) {
		const data = validate({
			name: req.body.name,
			isSchool: req.body.isSchool,
			isGateway: req.body.isGateway
		}, {
			name: { required: true, rules: [Validation.isString, Validation.isLongerThanX(2)] },
			isSchool: { required: true, rules: [Validation.isBoolean] },
			isGateway: { required: true, rules: [Validation.isBoolean] }
		})

		return await AddInstitution.execute(data)
	}

	static async UpdateInstitution (req: Request) {
		const data = validate({
			name: req.body.name,
			isSchool: req.body.isSchool,
			isGateway: req.body.isGateway
		}, {
			name: { required: true, rules: [Validation.isString, Validation.isLongerThanX(2)] },
			isSchool: { required: true, rules: [Validation.isBoolean] },
			isGateway: { required: true, rules: [Validation.isBoolean] }
		})

		return await UpdateInstitution.execute({ id: req.params.id, data })
	}

	static async DeleteInstitution (req: Request) {
		const isDeleted = await DeleteInstitution.execute(req.params.id)

		if (isDeleted) return isDeleted
		throw new NotFoundError()
	}
}