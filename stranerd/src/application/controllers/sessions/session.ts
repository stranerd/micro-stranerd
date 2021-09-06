import { AcceptSession, AddSession, CancelSession, GetSession, GetSessions } from '@modules/sessions'
import { FindUser } from '@modules/users'
import { NotAuthorizedError, QueryParams, Request, validate, Validation } from '@utils/commons'

export class SessionController {

	static async getSessions (req: Request) {
		const query = req.body as QueryParams
		return await GetSessions.execute(query)
	}

	static async getSession (req: Request) {
		return await GetSession.execute(req.params.id)
	}

	static async addSession (req: Request) {

		const isLongerThan4 = (val: string) => Validation.isLongerThan(val, 4)
		const isMoreThan10 = (val: number) => Validation.isMoreThan(val, 11)

		const data = validate({
			message: req.body.message,
			studentId: req.body.studentId,
			tutorId: req.body.tutorId,
			duration: req.body.duration,
			price: req.body.price
		}, {
			message: { required: true, rules: [isLongerThan4] },
			studentId: { required: true, rules: [] },
			tutorId: { required: true, rules: [] },
			duration: { required: true, rules: [isMoreThan10] },
			price: { required: true, rules: [isMoreThan10] }
		})
		
		const studentUser = await FindUser.execute(data.studentId)
		const tutorUser = await FindUser.execute(data.tutorId)


		if (studentUser && tutorUser) return await AddSession.execute({
			...data,
			tutorBio: tutorUser.bio,
			studentBio: studentUser.bio
		})

		throw new NotAuthorizedError()
	}

	static async acceptSession (req: Request) {
		const data = validate({
			id: req.body.id,
			tutorId: req.body.tutorId,
			accepted: req.body.accepted
		}, {
			id: { required: true, rules: [] },
			tutorId: { required: true, rules: [] },
			accepted: { required: true, rules: [] }
		})

		const tutorUser = await FindUser.execute(data.tutorId)

		if (tutorUser) return await AcceptSession.execute(data)

		throw new NotAuthorizedError()
	}


	static async cancleSession (req: Request) {

		const isLongerThan4 = (val: string) => Validation.isLongerThan(val, 4)

		const data = validate({
			sessionIds: req.body.sessionIds,
			reason: req.body.reason
		}, {
			sessionIds: { required: true, rules: [] },
			reason: { required: true, rules: [isLongerThan4] }
		})

		if (req.authUser?.id) return await CancelSession.execute({
			...data,
			 userId: req.authUser.id
		})

		throw new NotAuthorizedError()
	}
}