import { FindNotification, GetNotifications, MarkNotificationSeen } from '@modules/users'
import { Conditions, QueryParams, Request, validate } from '@utils/commons'

export class NotificationsController {
	static async getNotifications (req: Request) {
		const query = req.body as QueryParams
		query.whereType = 'and'
		if (!query.where) query.where = []
		const ofUser = query.where.find((q) => q.field === 'userId')
		if (ofUser) {
			ofUser.condition = Conditions.eq
			ofUser.value = req.authUser!.id
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

		await MarkNotificationSeen.execute({
			id: req.params.id,
			userId: req.authUser!.id,
			seen: !!data.seen
		})

		return true
	}
}