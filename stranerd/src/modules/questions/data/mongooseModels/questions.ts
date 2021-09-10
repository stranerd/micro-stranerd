import { generateChangeStreams, mongoose } from '@utils/commons'
import { QuestionFromModel } from '../models'
import { QuestionChangeStreamCallbacks } from '@utils/changeStreams/questions/questions'
import { QuestionEntity } from '../../domain/entities'
import { QuestionMapper } from '../mappers'

const Schema = new mongoose.Schema<QuestionFromModel>({
	_id: {
		type: String,
		default: new mongoose.Types.ObjectId() as unknown as string
	},
	body: {
		type: String,
		required: true
	},
	coins: {
		type: Number,
		required: true
	},
	tags: {
		type: [String],
		required: true
	},
	subjectId: {
		type: String,
		required: true
	},
	userId: {
		type: String,
		required: true
	},
	userBio: {
		type: Object as unknown as QuestionFromModel['userBio'],
		required: false,
		default: {} as unknown as QuestionFromModel['userBio']
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

Schema.index({ body: 'text' })

export const Question = mongoose.model<QuestionFromModel>('StranerdQuestion', Schema)

generateChangeStreams<QuestionFromModel, QuestionEntity>(Question, QuestionChangeStreamCallbacks, new QuestionMapper().mapFrom).then()