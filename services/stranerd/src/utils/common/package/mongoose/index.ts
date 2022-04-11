import mongoose from 'mongoose'
import { startAllChangeStreams } from './changeStreams'
import { mongoDbURI } from '../config'
import { getLogger } from '../logger'

export * from './query'
export * from './changeStreams'

export const setupMongooseConnection = async () => {
	try {
		await mongoose.connect(mongoDbURI)
		await startAllChangeStreams()
		process.on('exit', () => mongoose.disconnect())
	} catch (error) {
		await getLogger().error('MongoDb failed with error:', error)
		process.exit(1)
	}
}

export { mongoose }