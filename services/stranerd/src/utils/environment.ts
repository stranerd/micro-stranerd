import { getEnvOrFail } from '@utils/commons'

const environment = getEnvOrFail('ENVIRONMENT')
export const isDev = environment === 'local'

export const port = parseInt(getEnvOrFail('PORT'))
export const appId = getEnvOrFail('APP_ID')

export const clientDomain = `http${!isDev ? 's' : ''}://` + getEnvOrFail('CLIENT_DOMAIN')

const stripe = JSON.parse(getEnvOrFail('STRIPE') || '{}')
export const stripeConfig = {
	secretKey: stripe.secretKey,
	publicKey: stripe.publicKey
}