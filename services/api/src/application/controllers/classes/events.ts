import { ClassesUseCases, ClassUsers, EventsUseCases, EventType } from '@modules/classes'
import { UsersUseCases } from '@modules/users'
import { BadRequestError, NotAuthorizedError, QueryParams, Request, validate, Validation } from '@utils/commons'
import { getCronOrder } from '@utils/modules/classes/events'

const isValidTimeZone = (tz: string) => {
	try {
		Intl.DateTimeFormat(undefined, { timeZone: tz })
		return true
	} catch (ex) {
		return false
	}
}

const isCronValid = (val: any) => {
	const isDayValid = Validation.isNumber(val?.day).valid && Validation.isMoreThanOrEqualTo(val?.day, 0).valid && Validation.isLessThan(val?.day, 7).valid
	const isHourValid = Validation.isNumber(val?.hour).valid && Validation.isMoreThanOrEqualTo(val?.hour, 0).valid && Validation.isLessThan(val?.hour, 24).valid
	const isMinuteValid = Validation.isNumber(val?.minute).valid && Validation.isMoreThanOrEqualTo(val?.minute, 0).valid && Validation.isLessThan(val?.minute, 60).valid
	const isValidTz = isValidTimeZone(val?.tz)
	return [isDayValid, isHourValid, isMinuteValid, isValidTz].every((e) => e) ? Validation.isValid() : Validation.isInvalid('not a valid cron object')
}

const isCronMore = (start: any) => (val: any) => getCronOrder(val) >= getCronOrder(start) ? Validation.isValid() : Validation.isInvalid('must be after start')

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
		const isTimetable = req.body.data?.type === EventType.timetable
		const isOneOff = req.body.data?.type === EventType.oneOff
		const { title, type, scheduledAt, start, end } = validate({
			title: req.body.title,
			type: req.body.data?.type,
			scheduledAt: req.body.data?.scheduledAt,
			start: req.body.data?.start,
			end: req.body.data?.end
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
			start: { required: isTimetable, rules: [isCronValid] },
			end: { required: isTimetable, rules: [isCronValid, isCronMore(req.body.data?.start)] }
		})

		const updatedEvent = await EventsUseCases.update({
			id: req.params.id,
			classId: req.params.classId,
			userId: authUserId,
			data: {
				title,
				data: isTimetable ? { type, start, end } : { type, scheduledAt }
			}
		})

		if (updatedEvent) return updatedEvent
		throw new NotAuthorizedError()
	}

	static async CreateEvent (req: Request) {
		const authUserId = req.authUser!.id
		const user = await UsersUseCases.find(authUserId)
		if (!user) throw new BadRequestError('user not found')

		const isTimetable = req.body.data?.type === EventType.timetable
		const isOneOff = req.body.data?.type === EventType.oneOff
		const { title, classId, type, scheduledAt, start, end } = validate({
			title: req.body.title,
			classId: req.params.classId,
			type: req.body.data?.type,
			scheduledAt: req.body.data?.scheduledAt,
			start: req.body.data?.start,
			end: req.body.data?.end
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
			start: { required: isTimetable, rules: [isCronValid] },
			end: { required: isTimetable, rules: [isCronValid, isCronMore(req.body.data?.start)] }
		})

		const classInst = await ClassesUseCases.find(classId)
		if (!classInst) throw new BadRequestError('class not found')
		if (!classInst!.users[ClassUsers.admins].includes(authUserId)) throw new BadRequestError('not a class admin')

		return await EventsUseCases.add({
			title, classId, users: classInst.users, user: user.getEmbedded(),
			data: isTimetable ? { type, start, end } : { type, scheduledAt }
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