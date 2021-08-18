import * as mongoose from 'mongoose'
import { mongoDbURI } from '../config'
import { DatabaseConnectionError } from '../errors'

export const getMongooseConnection = async () => {
	try {
		return await mongoose.connect(mongoDbURI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
			useCreateIndex: false
		})
	} catch (err) { throw new DatabaseConnectionError() }
}
