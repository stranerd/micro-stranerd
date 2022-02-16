import { generateChangeStreams, MediaOutput, mongoose } from '@utils/commons'
import { AnswerFromModel } from '../models/answers'
import { AnswerChangeStreamCallbacks } from '@utils/changeStreams/questions/answers'
import { AnswerEntity } from '../../domain/entities/answers'
import { AnswerMapper } from '../mappers/answers'

const Schema = new mongoose.Schema<AnswerFromModel>({
	_id: {
		type: String,
		default: () => new mongoose.Types.ObjectId().toString()
	},
	title: {
		type: String,
		required: true
	},
	body: {
		type: String,
		required: false,
		default: ''
	},
	questionId: {
		type: String,
		required: true
	},
	userId: {
		type: String,
		required: true
	},
	userBio: {
		type: mongoose.Schema.Types.Mixed as unknown as AnswerFromModel['userBio'],
		required: false,
		default: {} as unknown as AnswerFromModel['userBio']
	},
	userRoles: {
		type: mongoose.Schema.Types.Mixed as unknown as AnswerFromModel['userRoles'],
		required: false,
		default: {} as unknown as AnswerFromModel['userRoles']
	},
	attachments: {
		type: [mongoose.Schema.Types.Mixed] as unknown as MediaOutput[],
		required: false,
		default: []
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
}, { timestamps: { currentTime: Date.now }, minimize: false })

export const Answer = mongoose.model<AnswerFromModel>('StranerdAnswer', Schema)

generateChangeStreams<AnswerFromModel, AnswerEntity>(Answer, AnswerChangeStreamCallbacks, new AnswerMapper().mapFrom).then()

