import { mongoose } from '@utils/commons'
import { AnswerFromModel } from '../models'

const Schema = new mongoose.Schema<AnswerFromModel>({
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
	userId: {
		type: String,
		required: true
	},
	userBio: {
		type: Object,
		required: false,
		default: {}
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
	ratings: {
		type: Object,
		required: false,
		default: { total: 0, count: 0 }
	},
	commentsCount: {
		type: Number,
		required: false,
		default: 0
	}
})

export const Answer = mongoose.model<AnswerFromModel>('Answer', Schema)

