import { generateChangeStreams, mongoose } from '@utils/commons'
import { FileFromModel } from '../models/files'
import { FileChangeStreamCallbacks } from '@utils/changeStreams/study/files'
import { FileEntity } from '../../domain/entities/files'
import { FileMapper } from '../mappers/files'
import { DiscussionFromModel } from '@modules/classes'

const Schema = new mongoose.Schema<FileFromModel>({
	_id: {
		type: String,
		default: () => new mongoose.Types.ObjectId().toString()
	},
	title: {
		type: String,
		required: true
	},
	content: {
		type: String,
		required: false,
		default: ''
	},
	user: {
		type: mongoose.Schema.Types.Mixed as unknown as FileFromModel['user'],
		required: true
	},
	isPrivate: {
		type: Boolean,
		required: false,
		default: true
	},
	links: {
		type: [mongoose.Schema.Types.Mixed] as unknown as DiscussionFromModel['links'],
		required: false,
		default: []
	},
	media: {
		type: mongoose.Schema.Types.Mixed,
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

export const File = mongoose.model<FileFromModel>('StranerdStudyFile', Schema)

generateChangeStreams<FileFromModel, FileEntity>(File, FileChangeStreamCallbacks, new FileMapper().mapFrom).then()