import { ChangeStreamCallbacks } from '@utils/app/package'
import { TokenEntity, TokenFromModel } from '@modules/push'

export const TokenChangeStreamCallbacks: ChangeStreamCallbacks<TokenFromModel, TokenEntity> = {}