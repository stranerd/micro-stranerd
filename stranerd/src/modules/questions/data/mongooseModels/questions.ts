import { generateChangeStreams, mongoose } from '@utils/commons'
import { QuestionFromModel } from '../models'
import { QuestionChangeStreamCallbacks } from '@utils/changeStreams/questions/questions'

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
	}
})

export const Question = mongoose.model<QuestionFromModel>('Question', Schema)

generateChangeStreams<QuestionFromModel>(Question, QuestionChangeStreamCallbacks).then()