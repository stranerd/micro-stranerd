import { mongoose } from '@utils/commons'
import { SubjectFromModel } from '../models'
import { PaginateModel,model, Document } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const Schema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	dates: {
		type: Object,
		required: true
	}
})

Schema.plugin(mongoosePaginate)

interface SubjectsModel<T extends Document> extends PaginateModel<T> {}

export const Subjects: SubjectsModel<SubjectFromModel> = model('Subjects', Schema) as SubjectsModel<SubjectFromModel>