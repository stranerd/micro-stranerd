import mongoose from 'mongoose'
import { mongoDbURI } from '../config'
import { Logger } from '../logger'

export const setupMongooseConnection = async () => {
	try {
		return await mongoose.connect(mongoDbURI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
			useCreateIndex: true
		})
	} catch (error) {
		await Logger.error('MongoDb failed with error:', error)
		process.exit(1)
	}
}

export { mongoose }