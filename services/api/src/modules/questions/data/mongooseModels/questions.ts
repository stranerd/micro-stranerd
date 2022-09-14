import { generateChangeStreams, mongoose } from '@utils/app/package'
import { QuestionFromModel } from '../models/questions'
import { QuestionChangeStreamCallbacks } from '@utils/changeStreams/questions/questions'
import { QuestionEntity } from '../../domain/entities/questions'
import { QuestionMapper } from '../mappers/questions'
import { QuestionMetaType } from '../../domain/types'

const Schema = new mongoose.Schema<QuestionFromModel>({
	_id: {
		type: String,
		default: () => new mongoose.Types.ObjectId().toString()
	},
	body: {
		type: String,
		required: true
	},
	tagId: {
		type: String,
		required: true,
		default: ''
	},
	user: {
		type: mongoose.Schema.Types.Mixed as unknown as QuestionFromModel['user'],
		required: true
	},
	bestAnswers: {
		type: [String],
		required: false,
		default: []
	},
	answers: {
		type: [Object as unknown as any],
		required: false,
		default: []
	},
	attachments: {
		type: [Object] as unknown as QuestionFromModel['attachments'],
		required: false,
		default: []
	},
	meta: Object.fromEntries(
		Object.keys(QuestionMetaType).map((key) => [key, {
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

export const Question = mongoose.model<QuestionFromModel>('StranerdQuestion', Schema)

generateChangeStreams<QuestionFromModel, QuestionEntity>(Question, QuestionChangeStreamCallbacks, new QuestionMapper().mapFrom).then()