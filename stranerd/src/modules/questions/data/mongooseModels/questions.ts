import { mongoose } from '@utils/commons'
import { QuestionFromModel } from '../models'
import { PaginateModel,model, Document } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const Schema = new mongoose.Schema({
	body: {
		type: String,
		required: true
	},
	coin: {
		type: Number,
		required: true
	},
	tag: {
		type: Array,
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
	answerId: {
		type: Object,
		required: false
	},
	answers: {
		type: Number,
		required: false
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

interface QuestionsModel<T extends Document> extends PaginateModel<T> {}

export const Questions: QuestionsModel<QuestionFromModel> = model('Questions', Schema) as QuestionsModel<QuestionFromModel>