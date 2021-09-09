import { BaseEntity } from '@utils/commons'

export class TransactionEntity extends BaseEntity {
	public readonly id: string
	public readonly isGold: boolean
	public readonly event: string
	public readonly userId: string
	public readonly amount: number
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({ id, isGold, event, amount, userId, createdAt, updatedAt }: TransactionConstructorArgs) {
		super()
		this.id = id
		this.isGold = isGold
		this.event = event
		this.userId = userId
		this.amount = amount
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}
}

type TransactionConstructorArgs = {
	id: string, event: string, amount: number, isGold: boolean
	userId: string, createdAt: number, updatedAt: number
}
