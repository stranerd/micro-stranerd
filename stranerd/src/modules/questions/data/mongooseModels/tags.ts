import { generateChangeStreams, mongoose } from '@utils/commons'
import { TagFromModel } from '../models'
import { TagChangeStreamCallbacks } from '@utils/changeStreams/questions/tags'
import { TagEntity } from '@modules/questions/domain/entities'
import { TagMapper } from '@modules/questions/data/mappers'

const Schema = new mongoose.Schema<TagFromModel>({
	_id: {
		type: String,
		default: new mongoose.Types.ObjectId() as unknown as string
	},
	name: {
		type: String,
		trim: true,
		lowercase: true,
		unique: true,
		required: true
	},
	count: {
		type: Number,
		required: false,
		default: 0
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
}, { timestamps: { currentTime: Date.now } })

export const Tag = mongoose.model<TagFromModel>('StranerdTag', Schema)

generateChangeStreams<TagFromModel, TagEntity>(Tag, TagChangeStreamCallbacks, new TagMapper().mapFrom).then()