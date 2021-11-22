import { generateChangeStreams, mongoose } from '@utils/commons'
import { TestFromModel } from '../models/tests'
import { TestChangeStreamCallbacks } from '@utils/changeStreams/study/tests'
import { TestEntity } from '../../domain/entities/tests'
import { TestMapper } from '../mappers/tests'

const Schema = new mongoose.Schema<TestFromModel>({
	_id: {
		type: String,
		default: () => new mongoose.Types.ObjectId() as unknown as string
	},
	userId: {
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
		type: [mongoose.Schema.Types.Mixed],
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
}, { timestamps: { currentTime: Date.now } })

export const Test = mongoose.model<TestFromModel>('StranerdTest', Schema)

generateChangeStreams<TestFromModel, TestEntity>(Test, TestChangeStreamCallbacks, new TestMapper().mapFrom).then()