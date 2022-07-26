export interface CardFromModel extends CardToModel {
	_id: string
	primary: boolean
	expired: boolean
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
	expiredAt: number
	userId: string
	email: string
}