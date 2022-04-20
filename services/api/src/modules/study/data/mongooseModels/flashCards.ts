import { generateChangeStreams, mongoose } from '@utils/commons'
import { FlashCardFromModel } from '../models/flashCards'
import { FlashCardChangeStreamCallbacks } from '@utils/changeStreams/study/flashCards'
import { FlashCardEntity } from '../../domain/entities/flashCards'
import { FlashCardMapper } from '../mappers/flashCards'

const Schema = new mongoose.Schema<FlashCardFromModel>({
	_id: {
		type: String,
		default: () => new mongoose.Types.ObjectId().toString()
	},
	title: {
		type: String,
		required: true
	},
	set: {
		type: [Object],
		required: true
	},
	userId: {
		type: String,
		required: true
	},
	userBio: {
		type: mongoose.Schema.Types.Mixed as unknown as FlashCardFromModel['userBio'],
		required: false,
		default: {} as unknown as FlashCardFromModel['userBio']
	},
	userRoles: {
		type: mongoose.Schema.Types.Mixed as unknown as FlashCardFromModel['userRoles'],
		required: false,
		default: {} as unknown as FlashCardFromModel['userRoles']
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

export const FlashCard = mongoose.model<FlashCardFromModel>('StranerdStudyFlashCard', Schema)

generateChangeStreams<FlashCardFromModel, FlashCardEntity>(FlashCard, FlashCardChangeStreamCallbacks, new FlashCardMapper().mapFrom).then()