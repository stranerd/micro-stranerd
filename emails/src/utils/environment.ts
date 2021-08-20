import { getEnvOrFail } from '@utils/commons'

export const port = parseInt(getEnvOrFail('PORT'))
export const appId = parseInt(getEnvOrFail('APP_ID'))
