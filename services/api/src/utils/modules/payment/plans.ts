import { Currencies, PlanToModel } from '@modules/payment'
import { CronTypes } from '@utils/commons'

export const planList: PlanToModel[] = [
	{
		_id: 'standard-plan',
		amount: 2500,
		currency: Currencies.NGN,
		name: 'Standard Plan',
		interval: CronTypes.monthly,
		data: { questions: 5 },
		active: true
	}
]