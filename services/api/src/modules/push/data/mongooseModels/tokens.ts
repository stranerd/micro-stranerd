import { mongoose } from '@utils/app/package'
import { appInstance } from '@utils/app/types'
import { TokenDbChangeCallbacks } from '@utils/changeStreams/push/tokens'
import { TokenEntity } from '../../domain/entities/tokens'
import { TokenMapper } from '../mappers/tokens'
import { TokenFromModel } from '../models/tokens'

const Schema = new mongoose.Schema<TokenFromModel>({
	_id: {
		type: String,
		default: () => new mongoose.Types.ObjectId().toString()
	},
	userId: {
		type: String,
		required: true
	},
	tokens: {
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
}, { timestamps: { currentTime: Date.now } })

export const Token = mongoose.model<TokenFromModel>('StranerdPushToken', Schema)

export const TokenChange = appInstance.db
	.generateDbChange<TokenFromModel, TokenEntity>(Token, TokenDbChangeCallbacks, new TokenMapper().mapFrom)