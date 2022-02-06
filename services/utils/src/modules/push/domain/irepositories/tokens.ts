import { TokenEntity } from '../entities/tokens'
import { AuthApps } from '@utils/commons'

export interface ITokenRepository {
	updateTokens: (userId: string, app: AuthApps, tokens: string[], add: boolean) => Promise<TokenEntity>
	find: (userId: string, app: AuthApps) => Promise<TokenEntity>
	delete: (userId: string) => Promise<boolean>
}
