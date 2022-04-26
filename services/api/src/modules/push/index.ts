import { TokenRepository } from './data/repositories/tokens'
import { TokensUseCase } from './domain/useCases/tokens'

const tokenRepository = TokenRepository.getInstance()

export const TokensUseCases = new TokensUseCase(tokenRepository)

export { TokenFromModel } from './data/models/tokens'
export { TokenEntity } from './domain/entities/tokens'