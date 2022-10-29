import { Currencies, PlanToModel } from '@modules/payment'
import { CronTypes } from '@utils/app/package'

export const plansList: PlanToModel[] = [
	{
		_id: 'premium-plan',
		amount: 2000,
		currency: Currencies.NGN,
		name: 'Premium',
		interval: CronTypes.monthly,
		data: { questions: 10, flashCards: 1 },
		active: true
	}
]