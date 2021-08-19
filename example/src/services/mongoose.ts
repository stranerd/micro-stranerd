import { getMongooseConnection } from '@utils/commons'
import { logger } from '@utils/logger'

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T

let db = null as ThenArg<ReturnType<typeof getMongooseConnection>> | null

export default async () => {
	if (db) return db
	db = await getMongooseConnection()
		.catch((err) => {
			logger.error(err)
			return null
		})
	return db
}