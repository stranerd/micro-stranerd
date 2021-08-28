import { getEnvOrFail } from '@utils/commons'

const environment = getEnvOrFail('ENVIRONMENT')
export const isDev = environment === 'development'

export const port = parseInt(getEnvOrFail('PORT'))
export const appId = getEnvOrFail('APP_ID')
export const googleClientId = getEnvOrFail('GOOGLE_CLIENT_ID')

export const clientDomain = `http${ !isDev ? 's' : '' }://` + getEnvOrFail('CLIENT_DOMAIN')
export const logo = clientDomain + '/images/logo-white.png'
