import { mongoose } from '@utils/app/package'
import { appInstance } from '@utils/app/types'
import { TestDbChangeCallbacks } from '@utils/changeStreams/study/tests'
import { TestEntity } from '../../domain/entities/tests'
import { TestMapper } from '../mappers/tests'
import { TestFromModel } from '../models/tests'

const Schema = new mongoose.Schema<TestFromModel>({
	_id: {
		type: String,
		default: () => new mongoose.Types.ObjectId().toString()
	},
	name: {
		type: String,
		required: true
	},
	userId: {
		type: String,
		required: true
	},
	prepId: {
		type: String,
		required: true
	},
	data: {
		type: mongoose.Schema.Types.Mixed,
		required: true,
		default: () => ({}) as unknown as TestFromModel['data']
	},
	questions: {
		type: [String],
		required: true,
		default: []
	},
	questionType: {
		type: String,
		required: true
	},
	answers: {
		type: mongoose.Schema.Types.Mixed,
		required: false,
		default: {}
	},
	score: {
		type: Number,
		required: true
	},
	done: {
		type: Boolean,
		required: false,
		default: false
	},
	taskIds: {
		type: [String],
		required: false,
		default: []
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

export const Test = mongoose.model<TestFromModel>('StranerdStudyTest', Schema)

export const TestChange = appInstance.db
	.generateDbChange<TestFromModel, TestEntity>(Test, TestDbChangeCallbacks, new TestMapper().mapFrom)