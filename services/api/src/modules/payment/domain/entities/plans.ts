import { BaseEntity } from '@utils/commons'
import { Currencies } from '../types'

export class PlanEntity extends BaseEntity {
	public readonly id: string
	public readonly name: string
	public readonly interval: string
	public readonly active: boolean
	public readonly amount: number
	public readonly currency: Currencies
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id,
		             amount,
		             currency,
		             name,
		             interval,
		             active,
		             createdAt,
		             updatedAt
	             }: PlanConstructorArgs) {
		super()
		this.id = id
		this.name = name
		this.interval = interval
		this.active = active
		this.amount = amount
		this.currency = currency
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}
}

type PlanConstructorArgs = {
	id: string
	name: string
	amount: number
	active: boolean
	currency: Currencies
	interval: string
	createdAt: number
	updatedAt: number
}