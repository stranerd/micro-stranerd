import { generateChangeStreams, mongoose } from '@utils/commons'
import { AnswerFromModel } from '../models/answers'
import { AnswerChangeStreamCallbacks } from '@utils/changeStreams/questions/answers'
import { AnswerEntity } from '../../domain/entities/answers'
import { AnswerMapper } from '../mappers/answers'
import { AnswerMetaType } from '../../domain/types'

const Schema = new mongoose.Schema<AnswerFromModel>({
	_id: {
		type: String,
		default: () => new mongoose.Types.ObjectId().toString()
	},
	body: {
		type: String,
		required: true
	},
	questionId: {
		type: String,
		required: true
	},
	tagId: {
		type: String,
		required: true,
		default: ''
	},
	user: {
		type: mongoose.Schema.Types.Mixed as unknown as AnswerFromModel['user'],
		required: true
	},
	attachments: {
		type: [mongoose.Schema.Types.Mixed] as unknown as AnswerFromModel['attachments'],
		required: false,
		default: []
	},
	best: {
		type: Boolean,
		required: false,
		default: false
	},
	meta: Object.fromEntries(
		Object.keys(AnswerMetaType).map((key) => [key, {
			type: Number,
			required: false,
			default: 0
		}])
	),
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

export const Answer = mongoose.model<AnswerFromModel>('StranerdQuestionsAnswer', Schema)

generateChangeStreams<AnswerFromModel, AnswerEntity>(Answer, AnswerChangeStreamCallbacks, new AnswerMapper().mapFrom).then()

