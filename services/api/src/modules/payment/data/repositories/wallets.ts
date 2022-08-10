import { IWalletRepository } from '../../domain/irepositories/wallets'
import { WalletMapper } from '../mappers/wallets'
import { Wallet } from '../mongooseModels/wallets'
import { AccountDetails, PlanDataType, SubscriptionModel } from '../../domain/types'

export class WalletRepository implements IWalletRepository {
	private static instance: WalletRepository
	private mapper: WalletMapper

	private constructor () {
		this.mapper = new WalletMapper()
	}

	static getInstance () {
		if (!WalletRepository.instance) WalletRepository.instance = new WalletRepository()
		return WalletRepository.instance
	}

	private static async getUserWallet (userId: string) {
		const wallet = await Wallet.findOneAndUpdate(
			{ userId },
			{ $setOnInsert: { userId } },
			{ upsert: true, new: true })
		return wallet!
	}

	async get (userId: string) {
		const wallet = await WalletRepository.getUserWallet(userId)
		return this.mapper.mapFrom(wallet)!
	}

	async updateAmount (userId: string, amount: number) {
		let wallet = await WalletRepository.getUserWallet(userId)
		wallet = (await Wallet.findByIdAndUpdate(wallet._id, { $inc: { amount } }, { new: true }))!
		return this.mapper.mapFrom(wallet)!
	}

	async updateSubscription (id: string, data: Partial<SubscriptionModel>) {
		data = Object.fromEntries(Object.entries(data).map(([key, val]) => [`subscription.${key}`, val]))
		const wallet = await Wallet.findByIdAndUpdate(id, { $set: data }, { new: true })
		return this.mapper.mapFrom(wallet)!
	}

	async updateSubscriptionData (userId: string, key: PlanDataType, value: number) {
		let wallet = await WalletRepository.getUserWallet(userId)
		wallet = (await Wallet.findByIdAndUpdate(wallet._id, { $inc: { [`subscription.data.${key}`]: value } }, { new: true }))!
		return this.mapper.mapFrom(wallet)!
	}

	async updateAccount (userId: string, account: AccountDetails) {
		let wallet = await WalletRepository.getUserWallet(userId)
		wallet = (await Wallet.findByIdAndUpdate(wallet._id, { $set: { account } }, { new: true }))!
		return this.mapper.mapFrom(wallet)!
	}
}
