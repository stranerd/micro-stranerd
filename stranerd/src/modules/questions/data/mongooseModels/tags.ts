import { generateChangeStreams, mongoose } from '@utils/commons'
import { TagFromModel } from '../models'
import { TagChangeStreamCallbacks } from '@utils/changeStreams/questions/tags'

const Schema = new mongoose.Schema<TagFromModel>({
	count: {
		type: Number,
		required: false,
		default: 0
	}
})

export const Tag = mongoose.model<TagFromModel>('Tag', Schema)

generateChangeStreams<TagFromModel>(Tag, TagChangeStreamCallbacks).then()