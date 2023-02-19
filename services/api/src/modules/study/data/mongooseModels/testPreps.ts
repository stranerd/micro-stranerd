import { mongoose } from '@utils/app/package'
import { appInstance } from '@utils/app/types'
import { TestPrepDbChangeCallbacks } from '@utils/changeStreams/study/testPreps'
import { TestPrepEntity } from '../../domain/entities/testPreps'
import { TestPrepMapper } from '../mappers/testPreps'
import { TestPrepFromModel } from '../models/testPreps'

const Schema = new mongoose.Schema<TestPrepFromModel>({
	_id: {
		type: String,
		default: () => new mongoose.Types.ObjectId().toString()
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

export const TestPrep = mongoose.model<TestPrepFromModel>('StranerdStudyTestPrep', Schema)

export const TestPrepChange = appInstance.db
	.generateDbChange<TestPrepFromModel, TestPrepEntity>(TestPrep, TestPrepDbChangeCallbacks, new TestPrepMapper().mapFrom)