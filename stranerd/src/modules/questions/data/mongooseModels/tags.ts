import { mongoose } from '@utils/commons'
import { TagFromModel } from '../models'

const Schema = new mongoose.Schema<TagFromModel>({
	count: {
		type: Number,
		required: false,
		default: 0
	}
})

export const Tag = mongoose.model<TagFromModel>('Tag', Schema)