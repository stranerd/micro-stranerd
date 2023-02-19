import { mongoose } from '@utils/app/package'
import { appInstance } from '@utils/app/types'
import { QuestionDbChangeCallbacks } from '@utils/changeStreams/questions/questions'
import { QuestionEntity } from '../../domain/entities/questions'
import { QuestionMetaType } from '../../domain/types'
import { QuestionMapper } from '../mappers/questions'
import { QuestionFromModel } from '../models/questions'

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
	isPrivate: {
		type: Boolean,
		required: false,
		default: false
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

export const Question = mongoose.model<QuestionFromModel>('StranerdQuestion', Schema)

export const QuestionChange = appInstance.db
	.generateDbChange<QuestionFromModel, QuestionEntity>(Question, QuestionDbChangeCallbacks, new QuestionMapper().mapFrom)