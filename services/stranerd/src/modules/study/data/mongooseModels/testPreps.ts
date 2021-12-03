import { generateChangeStreams, mongoose } from '@utils/commons'
import { TestPrepFromModel } from '../models/testPreps'
import { TestPrepChangeStreamCallbacks } from '@utils/changeStreams/study/testPreps'
import { TestPrepEntity } from '../../domain/entities/testPreps'
import { TestPrepMapper } from '../mappers/testPreps'

const Schema = new mongoose.Schema<TestPrepFromModel>({
	_id: {
		type: String,
		default: () => new mongoose.Types.ObjectId() as unknown as string
	},
	name: {
		type: String,
		required: true
	},
	data: {
		type: mongoose.Schema.Types.Mixed,
		required: true,
		default: () => ({}) as unknown as TestPrepFromModel['data']
	},
	questions: {
		type: Number,
		required: true
	},
	time: {
		type: Number,
		required: true
	},
	createdAt: {
		type: Number,
		required: false,
		default: Date.now
	},
	updatedAt: {
		type: Number,
		required: false,
		default: Date.now
	}
}, { timestamps: { currentTime: Date.now }, minimize: false })

export const TestPrep = mongoose.model<TestPrepFromModel>('StranerdTestPrep', Schema)

generateChangeStreams<TestPrepFromModel, TestPrepEntity>(TestPrep, TestPrepChangeStreamCallbacks, new TestPrepMapper().mapFrom).then()