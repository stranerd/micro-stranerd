import { WalletsUseCases } from '@modules/payment'
import { Request, validate, Validation } from '@utils/commons'
import { cancelSubscription, renewSubscription, subscribeToPlan } from '@utils/modules/payment/subscriptions'

export class WalletsController {
	static async get (req: Request) {
		return await WalletsUseCases.get(req.authUser!.id)
	}

	static async subscribeToPlan (req: Request) {
		const { subscriptionId } = validate({
			subscriptionId: req.body.subscriptionId
		}, {
			subscriptionId: { required: true, rules: [Validation.isString] }
		})

		return await subscribeToPlan(req.authUser!.id, subscriptionId)
	}

	static async cancelSubscription (req: Request) {
		return await cancelSubscription(req.authUser!.id)
	}

	static async renewSubscription (req: Request) {
		return await renewSubscription(req.authUser!.id)
	}
}