import { ChangeStreamCallbacks } from '@utils/commons'
import { TokenEntity, TokenFromModel } from '@modules/push'

export const TokenChangeStreamCallbacks: ChangeStreamCallbacks<TokenFromModel, TokenEntity> = {}