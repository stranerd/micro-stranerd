import { SessionsUseCases } from '@modules/sessions'
import { UsersUseCases } from '@modules/users'
import { BadRequestError, QueryKeys, QueryParams, Request, validate, Validation } from '@utils/commons'

export class SessionController {
	static async getSessions (req: Request) {
		const query = req.query as QueryParams
		query.auth = [
			{ field: 'studentId', value: req.authUser!.id },
			{ field: 'tutorId', value: req.authUser!.id }
		]
		query.authType = QueryKeys.or
		return await SessionsUseCases.get(query)
	}

	static async findSession (req: Request) {
		return await SessionsUseCases.find({
			sessionId: req.params.id,
			userId: req.authUser!.id
		})
	}

	static async addSession (req: Request) {
		const sessions = [
			{ duration: 15, price: 10 }, { duration: 30, price: 20 }, { duration: 60, price: 40 },
			{ duration: 120, price: 80 }, { duration: 180, price: 120 }
		]

		const studentUser = await UsersUseCases.find(req.authUser!.id)
		const tutorUser = await UsersUseCases.find(req.body.tutorId)

		if (!studentUser) throw new BadRequestError('student not found')
		if (!studentUser || !tutorUser) throw new BadRequestError('tutor not found')

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
				required: !!req.body.isScheduled,
				rules: [Validation.isNumberX('is not a valid date'), Validation.isMoreThanX(Date.now(), 'is less than the current date')]
			}
		})

		const requestedSession = sessions.find((s) => s.duration === data.duration)!

		return await SessionsUseCases.add({
			...data,
			price: requestedSession.price,
			tutor: tutorUser.getEmbedded(),
			student: studentUser.getEmbedded()
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

		return await SessionsUseCases.accept({
			accepted,
			id: req.params.id,
			tutorId: req.authUser!.id
		})
	}

	static async cancelSession (req: Request) {
		const sessionId = req.params.id
		const userId = req.authUser!.id

		return await SessionsUseCases.cancel({
			sessionIds: [sessionId],
			reason: 'student',
			userId
		})
	}

	static async endSession (req: Request) {
		const sessionId = req.params.id
		const userId = req.authUser!.id

		return await SessionsUseCases.end({
			sessionIds: [sessionId],
			studentId: userId
		})
	}
}