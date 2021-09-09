import { BaseEntity } from '@utils/commons'
import { PaymentType, SupportedCurrencies, SupportedMethods } from '../types'

export class PaymentEntity extends BaseEntity {
	public readonly id: string
	public readonly type: PaymentType
	public readonly method: SupportedMethods
	public readonly data: Record<string, any>
	public readonly userId: string
	public readonly intent: string
	public readonly amount: number
	public readonly currency: SupportedCurrencies
	public readonly isCompleted: boolean
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id, amount, method, data, type, userId, currency,
		             intent, createdAt, updatedAt, isCompleted
	             }: PaymentConstructorArgs) {
		super()
		this.id = id
		this.data = data
		this.method = method
		this.type = type
		this.userId = userId
		this.intent = intent
		this.amount = amount
		this.currency = currency
		this.isCompleted = isCompleted
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}
}

type PaymentConstructorArgs = {
	id: string, type: PaymentType, data: Record<string, any>, amount: number, method: SupportedMethods, intent: string
	userId: string, currency: SupportedCurrencies, createdAt: number, updatedAt: number, isCompleted: boolean
}
