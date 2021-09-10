import { ChangeStreamCallbacks } from '@utils/commons'
import { TransactionEntity, TransactionFromModel } from '@modules/users'

export const TransactionChangeStreamCallbacks: ChangeStreamCallbacks<TransactionFromModel, TransactionEntity> = {}