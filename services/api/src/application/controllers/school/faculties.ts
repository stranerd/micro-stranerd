import { FacultiesUseCases, InstitutionsUseCases } from '@modules/school'
import { BadRequestError, QueryParams, Request, validate, Validation } from '@utils/commons'

export class FacultyController {
	static async FindFaculty (req: Request) {
		return await FacultiesUseCases.find(req.params.id)
	}

	static async GetFaculties (req: Request) {
		const query = req.query as QueryParams
		return await FacultiesUseCases.get(query)
	}

	static async CreateFaculty (req: Request) {
		const data = validate({
			name: req.body.name,
			institutionId: req.body.institutionId
		}, {
			name: { required: true, rules: [Validation.isString, Validation.isLongerThanX(2)] },
			institutionId: { required: true, rules: [Validation.isString] }
		})
		const institution = await InstitutionsUseCases.find(data.institutionId)
		if (!institution) throw new BadRequestError('institution not found')
		if (institution.isGateway) throw new BadRequestError('institution is a gateway body')

		return await FacultiesUseCases.add(data)
	}

	static async UpdateFaculty (req: Request) {
		const data = validate({
			name: req.body.name
		}, {
			name: { required: true, rules: [Validation.isString, Validation.isLongerThanX(2)] }
		})

		const updatedFaculty = await FacultiesUseCases.update({ id: req.params.id, data })
		if (updatedFaculty) return updatedFaculty
		throw new BadRequestError('faculty not found')
	}

	static async DeleteFaculty (req: Request) {
		const isDeleted = await FacultiesUseCases.delete(req.params.id)
		if (isDeleted) return isDeleted
		throw new BadRequestError('faculty not found')
	}
}