import { getEnvOrFail } from '@utils/commons'

const environment = getEnvOrFail('ENVIRONMENT')
export const isDev = environment === 'development'

export const port = parseInt(getEnvOrFail('PORT'))
export const appId = getEnvOrFail('APP_ID')

export const clientDomain = `http${ !isDev ? 's' : '' }://` + getEnvOrFail('CLIENT_DOMAIN')

export const MINIMUM_QUESTION_COINS = 20
export const MAXIMUM_QUESTION_COINS = 100

const stripe = JSON.parse(getEnvOrFail('STRIPE') || '{}')
export const stripeConfig = {
	secretKey: stripe.secretKey,
	publicKey: stripe.publicKey
}