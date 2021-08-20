import { UseCase } from '../../base'
import { IUserRepository } from '../../contracts/repository'
import { AuthOutput, TokenInput } from '../../domain'

import { makeAccessToken, makeRefreshToken } from '@utils/commons'

export class GenerateAuthOutputUseCase implements UseCase<TokenInput, AuthOutput> {

    repository: IUserRepository

    constructor(repo: IUserRepository) {
		 this.repository = repo
    }

    async execute(TokenPayload: TokenInput): Promise<AuthOutput> {
        
		 const accessToken = await makeAccessToken(TokenPayload)
		 const refreshToken = await makeRefreshToken({id: TokenPayload.id})
		 const user = await this.repository.userDetails(TokenPayload.id)

		 const response = {
		  accessToken: accessToken,
		  refreshToken: refreshToken,
		  user
		  }

		  return new Promise((resolve) => resolve(response))
    }

}