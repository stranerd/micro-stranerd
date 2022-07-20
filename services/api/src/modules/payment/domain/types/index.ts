export enum Currencies {
	NGN = 'NGN',
	USD = 'USD'
}

export enum TransactionStatus {
	initialized = 'initialized',
	fulfilled = 'fulfilled',
	settled = 'settled'
}

export enum TransactionType {
	NewCard = 'NewCard'
}

type TransactionNewCard = {
	type: TransactionType.NewCard
}

export type TransactionData = TransactionNewCard