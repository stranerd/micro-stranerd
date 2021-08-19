import { UseCase } from '../../base'
import { SuccessStatus } from '../../domain'
import { IUserRepository } from '../../contracts/repository'

export class LogoutAuthUserUseCase implements UseCase<string, SuccessStatus> {
    repository

    constructor(repo: IUserRepository) {
	     this.repository = repo
    }

    async execute(userId: string | undefined): Promise<SuccessStatus> {

		 const cleared: boolean = await this.repository.clearUserAuthCache(userId)

		 const response = {
			 success: cleared
		  }

		 return new Promise((resolve) => resolve(response))
		

    }

}