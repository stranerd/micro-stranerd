import * as mongoose from 'mongoose'
import { mongoDbURI } from '../config'

export const getMongooseConnection = async () => await mongoose.connect(mongoDbURI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: false
})
