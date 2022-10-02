import { Currencies, PlanToModel } from '@modules/payment'
import { CronTypes } from '@utils/app/package'

export const plansList: PlanToModel[] = [
	{
		_id: 'solo-plan',
		amount: 1500,
		currency: Currencies.NGN,
		name: 'Solo',
		interval: CronTypes.monthly,
		data: { questions: 10 },
		features: {
			classes: true, flashCards: true, homework: true, connect: true,
			tests: false, solutions: false, manuals: false
		},
		active: true
	},
	{
		_id: 'premium-plan',
		amount: 2500,
		currency: Currencies.NGN,
		name: 'Premium',
		interval: CronTypes.monthly,
		data: { questions: 10 },
		features: {
			classes: true, flashCards: true, homework: true, connect: true,
			tests: true, solutions: true, manuals: true
		},
		active: false
	}
]