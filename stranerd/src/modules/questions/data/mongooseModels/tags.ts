import { generateChangeStreams, mongoose } from '@utils/commons'
import { TagFromModel } from '../models'
import { TagChangeStreamCallbacks } from '@utils/changeStreams/questions/tags'

const Schema = new mongoose.Schema<TagFromModel>({
	count: {
		type: Number,
		required: false,
		default: 0
	},
	createdAt: {
		type: Number,
		required: false,
		default: Date.now()
	},
	updatedAt: {
		type: Number,
		required: false,
		default: Date.now()
	}
}, { timestamps: { currentTime: Date.now } })

export const Tag = mongoose.model<TagFromModel>('Tag', Schema)

generateChangeStreams<TagFromModel>(Tag, TagChangeStreamCallbacks).then()