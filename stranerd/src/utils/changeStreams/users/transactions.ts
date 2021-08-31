import { ChangeStreamCallbacks } from '@utils/commons'
import { TransactionFromModel } from '@modules/users/data/models/transactions'

export const TransactionChangeStreamCallbacks: ChangeStreamCallbacks<TransactionFromModel> = {}