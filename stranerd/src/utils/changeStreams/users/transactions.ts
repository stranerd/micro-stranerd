import { ChangeStreamCallbacks } from '@utils/commons'
import { TransactionFromModel } from '@modules/users/data/models/transactions'
import { TransactionEntity } from '@modules/users/domain/entities/transactions'

export const TransactionChangeStreamCallbacks: ChangeStreamCallbacks<TransactionFromModel, TransactionEntity> = {}