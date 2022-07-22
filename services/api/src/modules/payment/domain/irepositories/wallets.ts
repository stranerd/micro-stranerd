import { WalletEntity } from '../entities/wallets'
import { SubscriptionModel } from '../types'

export interface IWalletRepository {
	get: (userId: string) => Promise<WalletEntity>
	updateAmount: (userId: string, amount: number) => Promise<WalletEntity>
	updateSubscription: (id: string, data: Partial<SubscriptionModel>) => Promise<WalletEntity>
}
