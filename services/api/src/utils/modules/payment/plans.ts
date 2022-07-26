import { Currencies, PlanToModel } from '@modules/payment'
import { CronTypes } from '@utils/commons'

export const plansList: PlanToModel[] = [
	{
		_id: 'premium-plan',
		amount: 2500,
		currency: Currencies.NGN,
		name: 'Premium',
		interval: CronTypes.monthly,
		data: { questions: 5 },
		active: true
	}
]