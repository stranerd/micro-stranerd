import mongoose from 'mongoose'
import { mongoDbURI } from '../config'
import { Logger } from '../logger'

export * from './query'
export * from './changeStreams'

export const setupMongooseConnection = async () => {
	try {
		await mongoose.connect(mongoDbURI)
	} catch (error) {
		await Logger.error('MongoDb failed with error:', error)
		process.exit(1)
	}
}

export { mongoose }