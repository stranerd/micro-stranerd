import { UseCase } from '../../base'
import { UserModel } from '../../domain'
import { IUserRepository } from '../../contracts/repository'

export class GetUserDetailsUseCase implements UseCase<string, UserModel> {
    repository

    constructor(repo: IUserRepository) {
	     this.repository = repo
    }

    async execute(userId: string): Promise<UserModel> {

		 const userDetails: UserModel = await this.repository.userDetails(userId)

		 if(userDetails) {

			 return new Promise((resolve) => resolve(userDetails))
                
			 }
			 
			 return new Promise((res, reject) => reject())
    }

}