export interface CardFromModel extends CardToModel {
	_id: string
	primary: boolean
	createdAt: number
	updatedAt: number
}

export interface CardToModel {
	first6Digits: string
	last4Digits: string
	issuer: string
	country: string
	type: string
	token: string
	expiry: string
	userId: string
	email: string
}