import { Currencies, PlanToModel } from '@modules/payment'

export const planList: PlanToModel[] = [
	{
		_id: 'standard-plan',
		amount: 2500,
		currency: Currencies.NGN,
		name: 'Standard Plan',
		interval: 'monthly',
		active: true
	}
]