export interface PaymentFromModel extends PaymentToModel {
	_id: string
	createdAt: number
	updatedAt: number
}

export interface PaymentToModel {
	isGold: boolean
	type: 'stripe' | 'flutterwave'
	isCompleted?: boolean
	amount: number
	userId: string
}