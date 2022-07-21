export interface WalletFromModel extends WalletToModel {
	_id: string
	balance: { amount: number }
	createdAt: number
	updatedAt: number
}

export interface WalletToModel {
	userId: string
}