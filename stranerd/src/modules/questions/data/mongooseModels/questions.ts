import { generateChangeStreams, mongoose } from '@utils/commons'
import { QuestionFromModel } from '../models'
import { QuestionChangeStreamCallbacks } from '@utils/changeStreams/questions/questions'
import { QuestionEntity } from '@modules/questions/domain/entities'
import { QuestionMapper } from '@modules/questions/data/mappers'

const Schema = new mongoose.Schema<QuestionFromModel>({
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
		type: mongoose.Schema.Types.ObjectId as unknown as StringConstructor,
		required: true
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId as unknown as StringConstructor,
		required: true
	},
	userBio: {
		type: Object as unknown as QuestionFromModel['userBio'],
		required: false,
		default: {} as unknown as QuestionFromModel['userBio']
	},
	bestAnswers: {
		type: [mongoose.Schema.Types.ObjectId as unknown as StringConstructor],
		required: false,
		default: []
	},
	answers: {
		type: [{
			id: mongoose.Schema.Types.ObjectId as unknown as StringConstructor,
			userId: mongoose.Schema.Types.ObjectId as unknown as StringConstructor
		}],
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