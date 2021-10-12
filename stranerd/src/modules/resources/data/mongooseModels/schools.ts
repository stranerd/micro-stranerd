import { generateChangeStreams, mongoose } from '@utils/commons'
import { SchoolFromModel } from '../models/schools'
import { SchoolChangeStreamCallbacks } from '@utils/changeStreams/resources/schools'
import { SchoolEntity } from '../../domain/entities/schools'
import { SchoolMapper } from '../mappers/schools'

const Schema = new mongoose.Schema<SchoolFromModel>({
	_id: {
		type: String,
		default: () => new mongoose.Types.ObjectId() as unknown as string
	},
	name: {
		type: String,
		required: true
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

export const School = mongoose.model<SchoolFromModel>('StranerdSchool', Schema)

generateChangeStreams<SchoolFromModel, SchoolEntity>(School, SchoolChangeStreamCallbacks, new SchoolMapper().mapFrom).then()