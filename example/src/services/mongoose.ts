import { getMongooseConnection } from '@utils/commons'
import { logger } from '@utils/logger'

const db = await getMongooseConnection()
	.catch((err) => logger.error(err))

export default db