import { mongoose } from '@utils/commons'
import { TagFromModel } from '../models'

const Schema = new mongoose.Schema<TagFromModel>({
	count: {
		type: Number,
		required: true
	}
})

export const Tags = mongoose.model<TagFromModel>('Tags', Schema)