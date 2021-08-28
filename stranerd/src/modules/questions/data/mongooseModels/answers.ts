import { mongoose } from '@utils/commons'
import { PaginateModel,model, Document } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import { AnswerFromModel } from '../models'

const Schema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	body: {
		type: String,
		required: true
	},
	best: {
		type: Boolean,
		required: false
	},
	coin: {
		type: Number,
		required: true
	},
	tag: {
		type: Array,
		required: true
	},
	questionId: {
		type: String,
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
	user: {
		type: Object,
		required: true
	},
	ratings: {
		type: Object,
		required: true
	},
	comments: {
		type: Object,
		required: false
	},
	dates: {
		type: Object,
		required: true
	}
})

Schema.plugin(mongoosePaginate)

interface AnswersModel<T extends Document> extends PaginateModel<T> {}

export const Answers: AnswersModel<AnswerFromModel> = model('Answers', Schema) as AnswersModel<AnswerFromModel>

