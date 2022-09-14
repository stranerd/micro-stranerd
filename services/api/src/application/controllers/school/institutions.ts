import { InstitutionsUseCases } from '@modules/school'
import { BadRequestError, QueryParams, Request, validate, Validation } from '@utils/app/package'

export class InstitutionController {
	static async FindInstitution (req: Request) {
		return await InstitutionsUseCases.find(req.params.id)
	}

	static async GetInstitutions (req: Request) {
		const query = req.query as QueryParams
		return await InstitutionsUseCases.get(query)
	}

	static async CreateInstitution (req: Request) {
		const data = validate({
			name: req.body.name,
			isGateway: req.body.isGateway
		}, {
			name: { required: true, rules: [Validation.isString, Validation.isLongerThanX(2)] },
			isGateway: { required: true, rules: [Validation.isBoolean] }
		})

		return await InstitutionsUseCases.add(data)
	}

	static async UpdateInstitution (req: Request) {
		const data = validate({
			name: req.body.name,
			isGateway: req.body.isGateway
		}, {
			name: { required: true, rules: [Validation.isString, Validation.isLongerThanX(2)] },
			isGateway: { required: true, rules: [Validation.isBoolean] }
		})

		const updatedInstitution = await InstitutionsUseCases.update({ id: req.params.id, data })
		if (updatedInstitution) return updatedInstitution
		throw new BadRequestError('institution not found')
	}

	static async DeleteInstitution (req: Request) {
		const isDeleted = await InstitutionsUseCases.delete(req.params.id)
		if (isDeleted) return isDeleted
		throw new BadRequestError('institution not found')
	}
}