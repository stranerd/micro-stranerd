import { generateChangeStreams, mongoose } from '@utils/commons'
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
	description: {
		type: String,
		required: false,
		default: ''
	},
	tags: {
		type: [String],
		required: true,
		set: (tags: string[]) => Array.from(new Set(tags))
	},
	userId: {
		type: String,
		required: true
	},
	userBio: {
		type: mongoose.Schema.Types.Mixed as unknown as NoteFromModel['userBio'],
		required: false,
		default: {} as unknown as NoteFromModel['userBio']
	},
	isPublic: {
		type: Boolean,
		required: false,
		default: true
	},
	isHosted: {
		type: Boolean,
		required: false,
		default: false
	},
	link: {
		type: String,
		required: false,
		default: null as unknown as string
	},
	media: {
		type: mongoose.Schema.Types.Mixed,
		required: false,
		default: null
	},
	preview: {
		type: mongoose.Schema.Types.Mixed,
		default: null as any,
		required: false
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

export const Note = mongoose.model<NoteFromModel>('StranerdNote', Schema)

generateChangeStreams<NoteFromModel, NoteEntity>(Note, NoteChangeStreamCallbacks, new NoteMapper().mapFrom).then()