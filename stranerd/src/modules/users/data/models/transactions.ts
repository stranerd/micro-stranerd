export interface TransactionFromModel extends TransactionToModel {
	_id: string
	createdAt: number
	updatedAt: number
}

export interface TransactionToModel {
	isGold: boolean
	event: string
	amount: number
	userId: string
}