import { AddSubject, DeleteSubject, FindSubject, GetSubjects } from '@modules/questions'
import { NotFoundError, QueryParams, Request, validate, Validation } from '@utils/commons'

export class SubjectController {
	static async FindSubject (req: Request) {
		return await FindSubject.execute(req.params.id)
	}

	static async GetSubjects (req: Request) {
		const query = req.body as QueryParams
		return await GetSubjects.execute(query)
	}

	static async CreateSubject (req: Request) {
		const isLongerThan2 = (val: string) => Validation.isLongerThan(val, 2)

		const data = validate({
			name: req.body.name
		}, {
			name: { required: true, rules: [isLongerThan2] }
		})

		return await AddSubject.execute(data)
	}

	static async DeleteSubject (req: Request) {
		const isDeleted = await DeleteSubject.execute(req.params.id)

		if (isDeleted) return { success: isDeleted }
		throw new NotFoundError()
	}
}