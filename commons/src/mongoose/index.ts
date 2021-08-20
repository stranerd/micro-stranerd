import * as mongoose from 'mongoose'
import { mongoDbURI } from '../config'
import { getNewLoggerInstance } from '../logger'

export const setupMongooseConnection = async () => {
	try {
		return await mongoose.connect(mongoDbURI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
			useCreateIndex: false
		})
	} catch (error) {
		await getNewLoggerInstance().error('MongoDb failed with error:', error)
		process.exit(1)
	}
}

export { mongoose }