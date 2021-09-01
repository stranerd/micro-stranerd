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
		type: Array,
		required: true
	},
	subjectId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	},
	userBio: {
		type: Object,
		required: false,
		default: {}
	},
	bestAnswers: {
		type: Array,
		required: false,
		default: []
	},
	answersCount: {
		type: Number,
		required: false,
		default: 0
	},
	commentsCount: {
		type: Number,
		required: false,
		default: 0
	},
	createdAt: {
		type: Number,
		required: false,
		default: Date.now()
	},
	updatedAt: {
		type: Number,
		required: false,
		default: Date.now()
	}
}, { timestamps: { currentTime: Date.now } })

export const Question = mongoose.model<QuestionFromModel>('Question', Schema)

generateChangeStreams<QuestionFromModel, QuestionEntity>(Question, QuestionChangeStreamCallbacks, new QuestionMapper().mapFrom).then()