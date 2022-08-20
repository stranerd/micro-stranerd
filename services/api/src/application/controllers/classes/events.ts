import { ClassesUseCases, ClassUsers, EventsUseCases, EventType } from '@modules/classes'
import { UsersUseCases } from '@modules/users'
import {
	BadRequestError,
	NotAuthorizedError,
	QueryKeys,
	QueryParams,
	Request,
	validate,
	Validation,
	ValidationError
} from '@utils/commons'
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
		query.authType = QueryKeys.and
		query.auth = [{ field: 'classId', value: req.params.classId },
			{ field: 'users.members', value: req.authUser!.id }]
		return await EventsUseCases.get(query)
	}

	static async UpdateEvent (req: Request) {
		const authUserId = req.authUser!.id
		const isTimetable = req.body.data?.type === EventType.timetable
		const { title, type, start, end, lecturer } = validate({
			title: req.body.title,
			type: req.body.data?.type,
			start: req.body.data?.start,
			end: req.body.data?.end,
			lecturer: req.body.data?.lecturer
		}, {
			title: { required: true, rules: [Validation.isString, Validation.isLongerThanX(0)] },
			type: {
				required: true, rules: [Validation.isString, Validation.isShallowEqualToX(EventType.timetable)]
			},
			start: { required: isTimetable, rules: [isCronValid] },
			end: { required: isTimetable, rules: [isCronValid, isCronMore(req.body.data?.start)] },
			lecturer: { required: isTimetable, rules: [Validation.isString, Validation.isLongerThanX(0)] }
		})

		if (isTimetable) {
			const classInst = await ClassesUseCases.find(req.params.classId)
			if (!classInst) throw new BadRequestError('class not found')
			if (!classInst.courses.includes(title)) throw new ValidationError([{
				messages: ['is not a class course'],
				field: 'title'
			}])
		}

		const updatedEvent = await EventsUseCases.update({
			id: req.params.id,
			classId: req.params.classId,
			userId: authUserId,
			data: { title, data: { type, start, end, lecturer } }
		})

		if (updatedEvent) return updatedEvent
		throw new NotAuthorizedError()
	}

	static async CreateEvent (req: Request) {
		const authUserId = req.authUser!.id
		const user = await UsersUseCases.find(authUserId)
		if (!user) throw new BadRequestError('user not found')

		const isTimetable = req.body.data?.type === EventType.timetable
		const { title, classId, type, start, end, lecturer } = validate({
			title: req.body.title,
			classId: req.params.classId,
			type: req.body.data?.type,
			start: req.body.data?.start,
			end: req.body.data?.end,
			lecturer: req.body.data?.lecturer
		}, {
			title: { required: true, rules: [Validation.isString, Validation.isLongerThanX(0)] },
			classId: { required: true, rules: [Validation.isString] },
			type: {
				required: true, rules: [Validation.isString, Validation.isShallowEqualToX(EventType.timetable)]
			},
			start: { required: isTimetable, rules: [isCronValid] },
			end: { required: isTimetable, rules: [isCronValid, isCronMore(req.body.data?.start)] },
			lecturer: { required: isTimetable, rules: [Validation.isString, Validation.isLongerThanX(0)] }
		})

		const classInst = await ClassesUseCases.find(classId)
		if (!classInst) throw new BadRequestError('class not found')
		if (!classInst!.users[ClassUsers.admins].includes(authUserId)) throw new BadRequestError('not a class admin')
		if (isTimetable && !classInst.courses.includes(title)) throw new ValidationError([{
			messages: ['is not a class course'],
			field: 'title'
		}])

		return await EventsUseCases.add({
			title, classId, users: classInst.users, user: user.getEmbedded(),
			data: { type, start, end, lecturer }
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

	static async MarkRead (req: Request) {
		return await EventsUseCases.markRead({
			classId: req.params.classId,
			userId: req.authUser!.id
		})
	}
}