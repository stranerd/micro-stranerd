import { ClassesUseCases, ClassUsers, EventsUseCases, EventType } from '@modules/classes'
import { UsersUseCases } from '@modules/users'
import { BadRequestError, NotAuthorizedError, QueryParams, Request, validate, Validation } from '@utils/commons'
import { isValidCron } from 'cron-validator'

const isCronValid = (val: string) => isValidCron(val) ? Validation.isValid() : Validation.isInvalid('not a valid cron string')

export class EventController {
	static async FindEvent (req: Request) {
		return await EventsUseCases.find({ id: req.params.id, classId: req.params.classId, userId: req.authUser!.id })
	}

	static async GetEvent (req: Request) {
		const query = req.query as QueryParams
		query.auth = [{ field: 'classId', value: req.params.classId }, {
			field: 'users.members',
			value: req.authUser!.id
		}]
		return await EventsUseCases.get(query)
	}

	static async UpdateEvent (req: Request) {
		const authUserId = req.authUser!.id
		const isRepeatable = req.body.data?.type === EventType.repeatable
		const isOneOff = req.body.data?.type === EventType.oneOff
		const { title, type, scheduledAt, cron } = validate({
			title: req.body.title,
			type: req.body.data?.type,
			scheduledAt: req.body.data?.scheduledAt,
			cron: req.body.data?.cron
		}, {
			title: { required: true, rules: [Validation.isString, Validation.isExtractedHTMLLongerThanX(2)] },
			type: {
				required: true,
				rules: [Validation.isString, Validation.arrayContainsX(Object.values(EventType), (cur, val) => cur === val)]
			},
			scheduledAt: {
				required: isOneOff,
				rules: [Validation.isNumber, Validation.isMoreThanX(Date.now(), 'is less than the current date')]
			},
			cron: { required: isRepeatable, rules: [Validation.isString, isCronValid] }
		})

		const updatedEvent = await EventsUseCases.update({
			id: req.params.id,
			classId: req.params.classId,
			userId: authUserId,
			data: {
				title,
				data: isOneOff ? { type, scheduledAt } : isRepeatable ? { type, cron } : ({} as any)
			}
		})

		if (updatedEvent) return updatedEvent
		throw new NotAuthorizedError()
	}

	static async CreateEvent (req: Request) {
		const authUserId = req.authUser!.id
		const user = await UsersUseCases.find(authUserId)
		if (!user) throw new BadRequestError('user not found')

		const isRepeatable = req.body.data?.type === EventType.repeatable
		const isOneOff = req.body.data?.type === EventType.oneOff

		const { title, classId, type, scheduledAt, cron } = validate({
			title: req.body.title,
			classId: req.params.classId,
			type: req.body.data?.type,
			scheduledAt: req.body.data?.scheduledAt,
			cron: req.body.data?.cron
		}, {
			title: { required: true, rules: [Validation.isString, Validation.isExtractedHTMLLongerThanX(2)] },
			classId: { required: true, rules: [Validation.isString] },
			type: {
				required: true,
				rules: [Validation.isString, Validation.arrayContainsX(Object.values(EventType), (cur, val) => cur === val)]
			},
			scheduledAt: {
				required: isOneOff,
				rules: [Validation.isNumber, Validation.isMoreThanX(Date.now(), 'is less than the current date')]
			},
			cron: { required: isRepeatable, rules: [Validation.isString, isCronValid] }
		})

		const classInst = await ClassesUseCases.find(classId)
		if (!classInst) throw new BadRequestError('class not found')
		if (!classInst!.users[ClassUsers.admins].includes(authUserId)) throw new BadRequestError('not a class admin')

		return await EventsUseCases.add({
			title, classId, users: classInst.users, user: user.getEmbedded(),
			data: isOneOff ? { type, scheduledAt } : isRepeatable ? { type, cron } : ({} as any)
		})
	}

	static async DeleteEvent (req: Request) {
		const authUserId = req.authUser!.id
		const isDeleted = await EventsUseCases.delete({
			id: req.params.id,
			classId: req.params.classId,
			userId: authUserId
		})
		if (isDeleted) return isDeleted
		throw new NotAuthorizedError()
	}
}