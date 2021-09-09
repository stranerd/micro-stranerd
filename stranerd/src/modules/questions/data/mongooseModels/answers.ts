import { generateChangeStreams, mongoose } from '@utils/commons'
import { AnswerFromModel } from '../models'
import { AnswerChangeStreamCallbacks } from '@utils/changeStreams/questions/answers'
import { AnswerEntity } from '@modules/questions/domain/entities'
import { AnswerMapper } from '@modules/questions/data/mappers'

const Schema = new mongoose.Schema<AnswerFromModel>({
	_id: {
		type: String,
		default: new mongoose.Types.ObjectId() as unknown as string
	},
	title: {
		type: String,
		required: true
	},
	body: {
		type: String,
		required: true
	},
	questionId: {
		type: String,
		required: true
	},
	tags: {
		type: [String],
		required: false,
		default: []
	},
	userId: {
		type: String,
		required: true
	},
	userBio: {
		type: Object as unknown as AnswerFromModel['userBio'],
		required: false,
		default: {} as unknown as AnswerFromModel['userBio']
	},
	coins: {
		type: Number,
		required: true
	},
	best: {
		type: Boolean,
		required: false,
		default: false
	},
	votes: {
		type: [Object as unknown as any],
		required: false,
		default: []
	},
	commentsCount: {
		type: Number,
		required: false,
		default: 0
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

Schema.index({ title: 'text', body: 'text' })

export const Answer = mongoose.model<AnswerFromModel>('StranerdAnswer', Schema)

generateChangeStreams<AnswerFromModel, AnswerEntity>(Answer, AnswerChangeStreamCallbacks, new AnswerMapper().mapFrom).then()

