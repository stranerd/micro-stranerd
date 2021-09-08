import { generateChangeStreams, mongoose } from '@utils/commons'
import { TransactionFromModel } from '../models/transactions'
import { TransactionChangeStreamCallbacks } from '@utils/changeStreams/users/transactions'
import { TransactionEntity } from '@modules/users/domain/entities/transactions'
import { TransactionMapper } from '@modules/users/data/mappers/transactions'

const TransactionSchema = new mongoose.Schema<TransactionFromModel>({
	event: {
		type: String,
		required: true
	},
	amount: {
		type: Number,
		required: true
	},
	isGold: {
		type: Boolean,
		required: false,
		default: false
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId as unknown as StringConstructor,
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

export const Transaction = mongoose.model<TransactionFromModel>('StranerdTransaction', TransactionSchema)

generateChangeStreams<TransactionFromModel, TransactionEntity>(Transaction, TransactionChangeStreamCallbacks, new TransactionMapper().mapFrom).then()