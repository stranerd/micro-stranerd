import { getMongooseConnection } from '@utils/commons'

const db = await getMongooseConnection()

export default db