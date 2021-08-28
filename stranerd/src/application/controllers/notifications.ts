import { FindNotification, MarkNotificationSeen } from '../../modules/users'
import { Request, validate } from '@utils/commons'

export class NotificationsController {
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