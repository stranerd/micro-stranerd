import { TokenEntity, TokenFromModel } from '@modules/push'
import { DbChangeCallbacks } from '@utils/app/package'

export const TokenDbChangeCallbacks: DbChangeCallbacks<TokenFromModel, TokenEntity> = {}