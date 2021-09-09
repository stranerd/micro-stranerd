import { PaymentType, SupportedCurrencies, SupportedMethods } from '../../domain/types'

export interface PaymentFromModel extends PaymentToModel {
	_id: string
	isCompleted: boolean
	createdAt: number
	updatedAt: number
}

export interface PaymentToModel {
	type: PaymentType
	method: SupportedMethods
	data: Record<string, any>
	amount: number
	currency: SupportedCurrencies
	userId: string
	intent: string
}