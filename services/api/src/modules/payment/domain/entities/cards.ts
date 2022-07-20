import { BaseEntity } from '@utils/commons'

export class CardEntity extends BaseEntity {
	public readonly id: string
	public readonly first6Digits: string
	public readonly last4Digits: string
	public readonly issuer: string
	public readonly country: string
	public readonly type: string
	public readonly token: string
	public readonly expiry: string
	public readonly primary: boolean
	public readonly userId: string
	public readonly email: string
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id, first6Digits, last4Digits, issuer, country, type,
		             token, expiry, primary, userId, email, createdAt, updatedAt
	             }: CardConstructorArgs) {
		super()
		this.id = id
		this.first6Digits = first6Digits
		this.last4Digits = last4Digits
		this.issuer = issuer
		this.country = country
		this.type = type
		this.token = token
		this.expiry = expiry
		this.primary = primary
		this.userId = userId
		this.email = email
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}
}

type CardConstructorArgs = {
	id: string
	first6Digits: string
	last4Digits: string
	issuer: string
	country: string
	type: string
	token: string
	expiry: string
	primary: boolean
	userId: string
	email: string
	createdAt: number
	updatedAt: number
}