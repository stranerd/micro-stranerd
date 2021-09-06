import { FindNotification, GetNotifications, MarkNotificationSeen } from '@modules/users'
import { QueryParams, Request, validate } from '@utils/commons'

export class NotificationsController {
	static async getNotifications (req: Request) {
		const query = req.body as QueryParams
		query.auth = [{ field: 'userId', value: req.authUser!.id }]
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