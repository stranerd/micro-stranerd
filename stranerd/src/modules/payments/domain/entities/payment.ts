import { BaseEntity } from '@utils/commons'

export class PaymentEntity extends BaseEntity {
	public readonly id: string
	public readonly isGold: boolean
	public readonly type: string
	public readonly userId: string
	public readonly amount: number
	public isCompleted: boolean | null
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({ id, isGold, type, amount, userId, createdAt, updatedAt, isCompleted }: PaymentConstructorArgs) {
		super()
		this.id = id
		this.isGold = isGold
		this.type = type
		this.userId = userId
		this.amount = amount
		this.createdAt = createdAt
		this.isCompleted = isCompleted
		this.updatedAt = updatedAt
	}
}

type PaymentConstructorArgs = {
	id: string, type: string, amount: number, isGold: boolean
	userId: string, createdAt: number, updatedAt: number,isCompleted: boolean | null
}
