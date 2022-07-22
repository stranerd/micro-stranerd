import { SubscriptionModel } from '../../domain/types'

export interface WalletFromModel extends WalletToModel {
	_id: string
	balance: { amount: number }
	subscription: SubscriptionModel
	createdAt: number
	updatedAt: number
}

export interface WalletToModel {
	userId: string
}