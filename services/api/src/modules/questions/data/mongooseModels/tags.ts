import { generateChangeStreams, mongoose } from '@utils/commons'
import { TagFromModel } from '../models/tags'
import { TagChangeStreamCallbacks } from '@utils/changeStreams/questions/tags'
import { TagEntity } from '../../domain/entities/tags'
import { TagMapper } from '../mappers/tags'

const Schema = new mongoose.Schema<TagFromModel>({
	_id: {
		type: String,
		default: () => new mongoose.Types.ObjectId().toString()
	},
	title: {
		type: String,
		required: true
	},
	parent: {
		type: String,
		required: false,
		default: null
	},
	createdAt: {
		type: Number,
		required: false,
		default: Date.now
	},
	updatedAt: {
		type: Number,
		required: false,
		default: Date.now
	}
}, { timestamps: { currentTime: Date.now }, minimize: false })

export const Tag = mongoose.model<TagFromModel>('StranerdQuestionsTag', Schema)

generateChangeStreams<TagFromModel, TagEntity>(Tag, TagChangeStreamCallbacks, new TagMapper().mapFrom).then()

