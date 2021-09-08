import { AcceptSession, AddSession, CancelSession, FindSession, GetSessions } from '@modules/sessions'
import { FindUser } from '@modules/users'
import { NotFoundError, QueryParams, Request, validate, Validation } from '@utils/commons'

export class SessionController {
	static async getSessions (req: Request) {
		const query = req.body as QueryParams
		query.auth = [
			{ field: 'studentId', value: req.authUser!.id },
			{ field: 'tutorId', value: req.authUser!.id }
		]
		return await GetSessions.execute(query)
	}

	static async findSession (req: Request) {
		return await FindSession.execute({
			sessionId: req.params.id,
			userId: req.authUser!.id
		})
	}

	static async addSession (req: Request) {
		const isLongerThan2 = (val: string) => Validation.isLongerThan(val, 2)
		const isMoreThan0 = (val: number) => Validation.isMoreThan(val, 0)

		const data = validate({
			message: req.body.message,
			tutorId: req.body.tutorId,
			duration: req.body.duration,
			price: req.body.price
		}, {
			message: { required: true, rules: [isLongerThan2] },
			tutorId: { required: true, rules: [] },
			duration: { required: true, rules: [isMoreThan0] },
			price: { required: true, rules: [isMoreThan0] }
		})

		const studentUser = await FindUser.execute(req.authUser!.id)
		const tutorUser = await FindUser.execute(data.tutorId)

		if (studentUser && tutorUser) return await AddSession.execute({
			...data,
			tutorBio: tutorUser.bio,
			studentId: studentUser.id,
			studentBio: studentUser.bio
		})

		throw new NotFoundError()
	}

	static async acceptSession (req: Request) {
		const accepted = !!req.body.accepted

		return await AcceptSession.execute({
			accepted,
			id: req.params.id,
			tutorId: req.authUser!.id
		})
	}

	static async cancelSession (req: Request) {
		const sessionId = req.params.id
		const userId = req.authUser!.id

		return await CancelSession.execute({
			sessionIds: [sessionId],
			reason: 'tutor',
			userId
		})
	}
}