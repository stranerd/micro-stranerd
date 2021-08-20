import { getEnvOrFail } from '@utils/commons'

export const port = parseInt(getEnvOrFail('PORT'))
