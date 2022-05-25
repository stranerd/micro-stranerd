import { generateChangeStreams, mongoose } from '@utils/commons'
import { DocumentFromModel } from '../models/documents'
import { DocumentChangeStreamCallbacks } from '@utils/changeStreams/study/documents'
import { DocumentEntity } from '../../domain/entities/documents'
import { DocumentMapper } from '../mappers/documents'

const Schema = new mongoose.Schema<DocumentFromModel>({
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
		type: mongoose.Schema.Types.Mixed as unknown as DocumentFromModel['user'],
		required: true
	},
	isPrivate: {
		type: Boolean,
		required: false,
		default: true
	},
	links: {
		type: [mongoose.Schema.Types.Mixed] as unknown as DocumentFromModel['links'],
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

export const Document = mongoose.model<DocumentFromModel>('StranerdStudyDocument', Schema)

generateChangeStreams<DocumentFromModel, DocumentEntity>(Document, DocumentChangeStreamCallbacks, new DocumentMapper().mapFrom).then()