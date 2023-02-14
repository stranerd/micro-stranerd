import { ClassesUseCases, ClassUsers, EventsUseCases, EventType } from '@modules/classes'
import { UsersUseCases } from '@modules/users'
import {
	BadRequestError,
	NotAuthorizedError,
	QueryKeys,
	QueryParams,
	Request,
	Schema, validateReq,
	Validation,
	ValidationError
} from '@utils/app/package'
import { getCronOrder } from '@utils/modules/classes/events'
import { Cron } from '@modules/classes'

const isValidTimeZone = (tz: string) => {
	try {
		Intl.DateTimeFormat(undefined, { timeZone: tz })
		return true
	} catch (ex) {
		return false
	}
}

const isCronValid = () => Validation.makeRule<Cron>((value) => {
	const val = value as Cron
	const isDayValid = Validation.isNumber()(val?.day).valid && Validation.isMoreThanOrEqualTo(0)(val?.day).valid && Validation.isLessThan(7)(val?.day).valid
	const isHourValid = Validation.isNumber()(val?.hour).valid && Validation.isMoreThanOrEqualTo(0)(val?.hour).valid && Validation.isLessThan(24)(val?.hour).valid
	const isMinuteValid = Validation.isNumber()(val?.minute).valid && Validation.isMoreThanOrEqualTo(0)(val?.minute).valid && Validation.isLessThan(60)(val?.minute).valid
	const isValidTz = isValidTimeZone(val?.tz)
	return [isDayValid, isHourValid, isMinuteValid, isValidTz].every((e) => e) ? Validation.isValid(val) : Validation.isInvalid(['not a valid cron object'], val)
})

const isCronMore = (start: any) => Validation.makeRule<Cron>((val: any) =>
	getCronOrder(val) >= getCronOrder(start) ? Validation.isValid(val) : Validation.isInvalid(['must be after start'], val))

export class EventController {
	static async FindEvent (req: Request) {
		const event = await EventsUseCases.find(req.params.id)
		if (!event || event.classId !== req.params.classId || !event.users.members.includes(req.authUser!.id)) return null
		return event
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

		const data = validateReq({
			title: Schema.string().min(1),
			classId: Schema.string().min(1),
			data: Schema.object({
				type: Schema.any<EventType.timetable>().eq(EventType.timetable),
				start: Schema.any<Cron>().addRule(isCronValid()),
				end: Schema.any<Cron>().addRule(isCronValid()).addRule(isCronMore(req.body.data?.start)),
				lecturer: Schema.string().min(1)
			})
		}, { ...req.body, classId: req.params.classId })

		if (data.data.type === EventType.timetable) {
			const classInst = await ClassesUseCases.find(req.params.classId)
			if (!classInst) throw new BadRequestError('class not found')
			if (!classInst.courses.includes(data.title)) throw new ValidationError([{
				messages: ['is not a class course'],
				field: 'title'
			}])
		}

		const updatedEvent = await EventsUseCases.update({
			id: req.params.id,
			classId: req.params.classId,
			userId: authUserId,
			data
		})

		if (updatedEvent) return updatedEvent
		throw new NotAuthorizedError()
	}

	static async CreateEvent (req: Request) {
		const authUserId = req.authUser!.id
		const user = await UsersUseCases.find(authUserId)
		if (!user || user.isDeleted()) throw new BadRequestError('user not found')


		const data = validateReq({
			title: Schema.string().min(1),
			classId: Schema.string().min(1),
			data: Schema.object({
				type: Schema.any<EventType.timetable>().eq(EventType.timetable),
				start: Schema.any<Cron>().addRule(isCronValid()),
				end: Schema.any<Cron>().addRule(isCronValid()).addRule(isCronMore(req.body.data?.start)),
				lecturer: Schema.string().min(1)
			})
		}, { ...req.body, classId: req.params.classId })

		const classInst = await ClassesUseCases.find(data.classId)
		if (!classInst) throw new BadRequestError('class not found')
		if (!classInst!.users[ClassUsers.admins].includes(authUserId)) throw new BadRequestError('not a class admin')
		if (data.data.type === EventType.timetable && !classInst.courses.includes(data.title)) throw new ValidationError([{
			messages: ['is not a class course'],
			field: 'title'
		}])

		return await EventsUseCases.add({
			...data, users: classInst.users, user: user.getEmbedded()
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
			userId: req.authUser!.id,
			type: req.body.type
		})
	}
}