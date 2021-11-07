import { AcceptSession, AddSession, CancelSession, FindSession, GetSessions } from '@modules/sessions'
import { FindUser } from '@modules/users'
import { NotFoundError, QueryParams, Request, validate, Validation, ValidationError } from '@utils/commons'

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
			duration: req.body.duration
		}, {
			message: { required: true, rules: [Validation.isString, Validation.isLongerThanX(0)] },
			tutorId: { required: true, rules: [Validation.isString] },
			duration: {
				required: true,
				rules: [
					Validation.isNumber,
					Validation.arrayContainsX(sessions.map((s) => s.duration), (curr, val) => curr === val, 'is not a supported duration')
				]
			}
		})

		const requestedSession = sessions.find((s) => s.duration === data.duration)
		if (!requestedSession) throw new ValidationError([{
			field: 'duration',
			messages: ['is not a supported duration']
		}])
		if (requestedSession.price > studentUser.account.coins.bronze) throw new ValidationError([{
			field: 'duration',
			messages: ['cannot afford this session duration']
		}])

		return await AddSession.execute({
			...data,
			price: requestedSession.price,
			tutorBio: tutorUser.bio,
			studentId: studentUser.id,
			studentBio: studentUser.bio
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
			reason: 'tutor',
			userId
		})
	}
}