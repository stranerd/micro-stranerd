import { mongoose } from '@utils/commons'
import { PaginateModel,model, Document } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import { CommentFromModel } from '../models'

const Schema = new mongoose.Schema({
	body: {
		type: String,
		required: true
	},
	userId: {
		type: String,
		required: true
	},
	baseId: {
		type: String,
		required: true
	},
	user: {
		type: Object,
		required: true
	},
	dates: {
		type: Object,
		required: true
	}
})

Schema.plugin(mongoosePaginate)

interface CommentsModel<T extends Document> extends PaginateModel<T> {}

export const Comments: CommentsModel<CommentFromModel> = model('Comments', Schema) as CommentsModel<CommentFromModel>