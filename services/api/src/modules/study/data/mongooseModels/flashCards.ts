import { mongoose } from '@utils/app/package'
import { appInstance } from '@utils/app/types'
import { FlashCardDbChangeCallbacks } from '@utils/changeStreams/study/flashCards'
import { FlashCardEntity } from '../../domain/entities/flashCards'
import { FlashCardMapper } from '../mappers/flashCards'
import { FlashCardFromModel } from '../models/flashCards'

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
	user: {
		type: mongoose.Schema.Types.Mixed as unknown as FlashCardFromModel['user'],
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

export const FlashCard = mongoose.model<FlashCardFromModel>('StranerdStudyFlashCard', Schema)

export const FlashCardChange = appInstance.db
	.generateDbChange<FlashCardFromModel, FlashCardEntity>(FlashCard, FlashCardDbChangeCallbacks, new FlashCardMapper().mapFrom)