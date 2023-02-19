import { mongoose } from '@utils/app/package'
import { appInstance } from '@utils/app/types'
import { FileDbChangeCallbacks } from '@utils/changeStreams/study/files'
import { FileEntity } from '../../domain/entities/files'
import { FileMapper } from '../mappers/files'
import { FileFromModel } from '../models/files'

const Schema = new mongoose.Schema<FileFromModel>({
	_id: {
		type: String,
		default: () => new mongoose.Types.ObjectId().toString()
	},
	title: {
		type: String,
		required: true
	},
	media: {
		type: mongoose.Schema.Types.Mixed as unknown as FileFromModel['media'],
		required: true
	},
	user: {
		type: mongoose.Schema.Types.Mixed as unknown as FileFromModel['user'],
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
}, { timestamps: { currentTime: Date.now }, minimize: false })

export const File = mongoose.model<FileFromModel>('StranerdStudyFile', Schema)

export const FileChange = appInstance.db
	.generateDbChange<FileFromModel, FileEntity>(File, FileDbChangeCallbacks, new FileMapper().mapFrom)