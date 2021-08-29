import { mongoose } from '@utils/commons'
import { SubjectFromModel } from '../models'

const Schema = new mongoose.Schema<SubjectFromModel>({
	name: {
		type: String,
		required: true
	}
})

export const Subject = mongoose.model<SubjectFromModel>('Subject', Schema)