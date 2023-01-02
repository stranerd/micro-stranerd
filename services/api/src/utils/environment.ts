import { getEnvOrFail } from '@utils/app/package'
import { EmailsList } from '@utils/app/types'

const useSSL = parseInt(getEnvOrFail('USE_SSL'))
export const baseDomain = `http${useSSL ? 's' : ''}://` + getEnvOrFail('BASE_DOMAIN')
export const port = parseInt(getEnvOrFail('PORT'))
export const appId = getEnvOrFail('APP_ID')

export const environment = getEnvOrFail('ENVIRONMENT')
export const isDev = environment === 'local'
export const isProd = environment === 'production'

const mails = JSON.parse(getEnvOrFail('EMAILS') || '{}')
export const emails = Object.fromEntries(
	Object.entries(EmailsList).map(([key, value]) => [value, {
		privateKey: mails[key.toLowerCase()].private_key,
		clientId: mails[key.toLowerCase()].client_id
	}])
)

export const clientDomain = `http${!isDev ? 's' : ''}://` + getEnvOrFail('CLIENT_DOMAIN')

const flutterwave = JSON.parse(getEnvOrFail('FLUTTERWAVE') || '{}')
export const flutterwaveConfig = {
	secretKey: flutterwave.secretKey,
	publicKey: flutterwave.publicKey
}

const MAILCHIMP_CONFIG = JSON.parse(getEnvOrFail('MAILCHIMP_CONFIG') || '{}')
export const mailchimpConfig = {
	audienceId: MAILCHIMP_CONFIG.audienceId,
	apiKey: MAILCHIMP_CONFIG.apiKey,
	dataCenter: MAILCHIMP_CONFIG.dataCenter
}

export const superAdminEmail = getEnvOrFail('SUPER_ADMIN')

export const openAIKey = getEnvOrFail('OPEN_AI_KEY')

export const termiiAPIKey = getEnvOrFail('TERMII_API_KEY')
