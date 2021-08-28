import { mongoose } from '@utils/commons'
import { TagFromModel } from '../models'
import { PaginateModel,model, Document } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const Schema = new mongoose.Schema<TagFromModel>({
	count: {
		type: Number,
		required: true
	}
})

Schema.plugin(mongoosePaginate)

interface TagsModel<T extends Document> extends PaginateModel<T> {}

export const Tags: TagsModel<TagFromModel> = model('Tags', Schema) as TagsModel<TagFromModel>