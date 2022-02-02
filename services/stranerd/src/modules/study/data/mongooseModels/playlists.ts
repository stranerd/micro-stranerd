import { generateChangeStreams, mongoose } from '@utils/commons'
import { PlaylistFromModel } from '../models/playlists'
import { PlaylistChangeStreamCallbacks } from '@utils/changeStreams/study/playlists'
import { PlaylistEntity } from '../../domain/entities/playlists'
import { PlaylistMapper } from '../mappers/playlists'

const Schema = new mongoose.Schema<PlaylistFromModel>({
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
		required: true
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
		type: mongoose.Schema.Types.Mixed as unknown as PlaylistFromModel['userBio'],
		required: false,
		default: {} as unknown as PlaylistFromModel['userBio']
	},
	isPublic: {
		type: Boolean,
		required: false,
		default: true
	},
	links: {
		type: [String],
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

export const Playlist = mongoose.model<PlaylistFromModel>('StranerdPlaylist', Schema)

generateChangeStreams<PlaylistFromModel, PlaylistEntity>(Playlist, PlaylistChangeStreamCallbacks, new PlaylistMapper().mapFrom).then()