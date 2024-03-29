import FlutterwaveNode from 'flutterwave-node-v3'
import { flutterwaveConfig } from '@utils/environment'
import { Currencies, CurrencyCountries, MethodToModel, MethodType } from '@modules/payment'

const flw = () => new FlutterwaveNode(flutterwaveConfig.publicKey, flutterwaveConfig.secretKey)

type FwTransaction = {
	id: number,
	tx_ref: string,
	amount: number,
	currency: string,
	status: 'successful' | 'failed',
	created_at: string,
	card: {
		first_6digits: string,
		last_4digits: string,
		country: string,
		type: string,
		token: string,
		expiry: string
	},
	customer: {
		id: number
		email: string
	}
}

type TransferRate = {
	rate: number
	source: { currency: Currencies, amount: number }
	destination: { currency: Currencies, amount: number }
}

type Bank = {
	id: number
	code: string
	name: string
}

export class FlutterwavePayment {
	static async verify (transactionId: string, amount: number, currency: Currencies) {
		const res = await flw().CustomRequest.custom(`v3/transactions/verify_by_reference?tx_ref=${transactionId}`, { method: 'GET' }).catch(() => null)
		const transaction = res?.body?.data as FwTransaction | null
		if (!transaction) return false
		if (transaction.currency !== currency || transaction.amount !== amount) return false
		return transaction.status === 'successful'
	}

	static async saveCard (userId: string, transactionId: string): Promise<MethodToModel | null> {
		const res = await flw().CustomRequest.custom(`v3/transactions/verify_by_reference?tx_ref=${transactionId}`, { method: 'GET' }).catch(() => null)
		const transaction = res?.body?.data as FwTransaction | null
		if (!transaction) return null
		const [month, year] = transaction.card.expiry.split('/').map((x) => parseInt(x))
		const expireTime = new Date(2000 + year, month).getTime()
		return {
			userId, token: transaction.card.token,
			data: {
				type: MethodType.card,
				last4Digits: transaction.card.last_4digits,
				country: transaction.card.country,
				cardType: transaction.card.type,
				expiredAt: expireTime,
				expired: expireTime <= Date.now()
			}
		}
	}

	static async convertAmount (amount: number, from: Currencies, to: Currencies) {
		if (from === to) return amount
		// WARN: flutterwave expects 1000 USD to NGN to have destination as USD and source as NGN, weird right
		const res = await flw().CustomRequest.custom(`v3/transfers/rates?amount=${amount}&destination_currency=${from}&source_currency=${to}`, { method: 'GET' })
			.catch(() => null)
		// TODO: figure whether to throw, and consequences of throwing in background process
		const data = res?.body?.data as TransferRate | undefined
		return data?.source.amount ?? amount
	}

	static async chargeCard (data: {
		token: string, currency: Currencies, amount: number
		email: string, id: string
	}) {
		const res = await flw().Tokenized.charge({
			token: data.token,
			currency: data.currency,
			amount: data.amount,
			email: data.email,
			tx_ref: data.id
		}).catch(() => null)
		return (res?.data as FwTransaction | null)?.status === 'successful'
	}

	static async getBanks (country: CurrencyCountries) {
		const res = await flw().CustomRequest.custom(`v3/banks/${country}`, { method: 'GET' }).catch(() => null)
		return res?.body?.data as Bank[] ?? []
	}

	static async verifyAccount ({ number, bankCode }: { number: string, bankCode: string }) {
		const res = await flw().Misc.verify_Account({
			account_number: number,
			account_bank: bankCode
		}).catch(() => null)
		return !!res?.data
	}
}