import { FindNotification, GetNotifications, MarkNotificationSeen } from '@modules/users'
import { Conditions, QueryParams, Request, validate } from '@utils/commons'

export class NotificationsController {
	static async getNotifications (req: Request) {
		const query = req.body as QueryParams
		if (!query.where) query.where = []
		const byUser = query.where.find((q) => q.field === 'userId')
		if (byUser) {
			byUser.condition = Conditions.eq
			byUser.value = req.authUser!.id
		} else query.where.push({
			field: 'userId', condition: Conditions.eq, value: req.authUser!.id
		})
		return await GetNotifications.execute(query)
	}

	static async findNotification (req: Request) {
		return await FindNotification.execute({
			id: req.params.id,
			userId: req.authUser!.id
		})
	}

	static async markNotificationSeen (req: Request) {
		const data = validate({
			seen: req.body.seen
		}, {
			seen: { required: true, rules: [] }
		})

		return await MarkNotificationSeen.execute({
			id: req.params.id,
			userId: req.authUser!.id,
			seen: !!data.seen
		})
	}
}