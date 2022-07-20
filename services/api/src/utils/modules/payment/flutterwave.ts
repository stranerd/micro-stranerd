import FlutterwaveNode from 'flutterwave-node-v3'
import { flutterwaveConfig } from '@utils/environment'

const flw = new FlutterwaveNode(flutterwaveConfig.publicKey, flutterwaveConfig.secretKey)

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
		issuer: string,
		country: string,
		type: string,
		token: string,
		expiry: string
	},
	customer: {
		id: number,
		email: string,
	}
}

export class FlutterwavePayment {
	static async getTransactionByRef (ref: string) {
		const res = await flw.CustomRequest.custom(`v3/transactions/verify_by_reference?tx_ref=${ref}`, { method: 'GET' }).catch(() => null)
		return res?.body as FwTransaction | null
	}
}