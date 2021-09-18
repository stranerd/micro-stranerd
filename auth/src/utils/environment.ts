import { getEnvOrFail } from '@utils/commons'

const environment = getEnvOrFail('ENVIRONMENT')
export const isDev = environment === 'development'
export const isProd = environment === 'production'

export const port = parseInt(getEnvOrFail('PORT'))
export const appId = getEnvOrFail('APP_ID')
export const googleClientId = getEnvOrFail('GOOGLE_CLIENT_ID')

const MAILCHIMP_CONFIG = JSON.parse(getEnvOrFail('MAILCHIMP_CONFIG') || '{}')
export const mailchimpConfig = {
	audienceId: MAILCHIMP_CONFIG.audienceId,
	apiKey: MAILCHIMP_CONFIG.apiKey,
	dataCenter: MAILCHIMP_CONFIG.dataCenter
}

export const superAdminEmail = getEnvOrFail('SUPER_ADMIN')