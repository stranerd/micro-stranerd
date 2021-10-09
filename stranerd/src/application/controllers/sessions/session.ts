import { AcceptSession, AddSession, CancelSession, FindSession, GetSessions } from '@modules/sessions'
import { FindUser } from '@modules/users'
import { NotFoundError, QueryParams, Request, validate, Validation } from '@utils/commons'

export class SessionController {
	static async getSessions (req: Request) {
		const query = req.query as QueryParams
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
		const sessions = [
			{ duration: 15, price: 10 }, { duration: 30, price: 20 }, { duration: 60, price: 40 },
			{ duration: 120, price: 80 }, { duration: 180, price: 120 }
		]

		const data = validate({
			message: req.body.message,
			tutorId: req.body.tutorId,
			duration: req.body.duration,
			isScheduled: req.body.isScheduled ?? false,
			scheduledAt: req.body.scheduledAt
		}, {
			message: { required: true, rules: [Validation.isString, Validation.isLongerThanX(0)] },
			tutorId: { required: true, rules: [Validation.isString] },
			duration: {
				required: true,
				rules: [Validation.isNumber, Validation.arrayContainsX(sessions.map((s) => s.duration), (curr, val) => curr === val)]
			},
			isScheduled: { required: true, rules: [Validation.isBoolean] },
			scheduledAt: {
				required: false,
				rules: [Validation.isRequiredIfX(!!req.body.isScheduled), Validation.isNumberX('is not a valid date'), Validation.isMoreThanX(Date.now(), 'is less than the current date')]
			}
		})

		const studentUser = await FindUser.execute(req.authUser!.id)
		const tutorUser = await FindUser.execute(data.tutorId)

		if (studentUser && tutorUser && tutorUser.isTutor) return await AddSession.execute({
			...data,
			price: sessions.find((s) => s.duration === data.duration)!.price,
			tutorBio: tutorUser.bio,
			studentId: studentUser.id,
			studentBio: studentUser.bio
		})

		throw new NotFoundError()
	}

	static async acceptSession (req: Request) {
		const { accepted } = validate({
			accepted: req.body.accepted
		}, {
			accepted: {
				required: true,
				rules: [Validation.isBoolean]
			}
		})

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