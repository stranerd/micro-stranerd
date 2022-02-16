import { AcceptSession, AddSession, CancelSession, EndSession, FindSession, GetSessions } from '@modules/sessions'
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

		const studentUser = await FindUser.execute(req.authUser!.id)
		const tutorUser = await FindUser.execute(req.body.tutorId)

		if (!studentUser || !tutorUser) throw new NotFoundError()

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
				rules: [Validation.isNumber, Validation.arrayContainsX(sessions.map((s) => s.duration), (curr, val) => curr === val, 'is not a supported duration')]
			},
			isScheduled: { required: true, rules: [Validation.isBoolean] },
			scheduledAt: {
				required: false,
				rules: [Validation.isRequiredIfX(!!req.body.isScheduled), Validation.isNumberX('is not a valid date'), Validation.isMoreThanX(Date.now(), 'is less than the current date')]
			}
		})

		const requestedSession = sessions.find((s) => s.duration === data.duration)!

		return await AddSession.execute({
			...data,
			price: requestedSession.price,
			tutorBio: tutorUser.bio,
			tutorRoles: tutorUser.roles,
			studentId: studentUser.id,
			studentBio: studentUser.bio,
			studentRoles: studentUser.roles
		})
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
			reason: 'student',
			userId
		})
	}

	static async endSession (req: Request) {
		const sessionId = req.params.id
		const userId = req.authUser!.id

		return await EndSession.execute({
			sessionIds: [sessionId],
			studentId: userId
		})
	}
}