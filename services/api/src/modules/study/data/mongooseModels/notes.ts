import { generateChangeStreams, mongoose } from '@utils/app/package'
import { NoteFromModel } from '../models/notes'
import { NoteChangeStreamCallbacks } from '@utils/changeStreams/study/notes'
import { NoteEntity } from '../../domain/entities/notes'
import { NoteMapper } from '../mappers/notes'

const Schema = new mongoose.Schema<NoteFromModel>({
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
		type: mongoose.Schema.Types.Mixed as unknown as NoteFromModel['user'],
		required: true
	},
	links: {
		type: [mongoose.Schema.Types.Mixed] as unknown as NoteFromModel['links'],
		required: false,
		default: []
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

export const Note = mongoose.model<NoteFromModel>('StranerdStudyNote', Schema)

generateChangeStreams<NoteFromModel, NoteEntity>(Note, NoteChangeStreamCallbacks, new NoteMapper().mapFrom).then()