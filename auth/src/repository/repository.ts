import { IUserRepository } from '../application/contracts/repository'
import { Credential, TokenInput, UserModel, Tokens, AuthOutput, RoleInput } from '../application/domain'
import { UserEntity } from './entities/user.entity'
import { UserMapper } from './mapper/user.mapper'
import { exchangeOldForNewTokens, verifyRefreshToken, deleteCachedRefreshToken, deleteCachedAccessToken } from '@utils/commons'


const { User } = require('./mongoose-model/user.model')
 
export class Repository implements 
 IUserRepository  {
    
    private static instance: Repository
    private userMapper: UserMapper
	
	  constructor() {
		  this.userMapper = new UserMapper() 
    }

    static getInstance(): Repository {
		 if(!Repository.instance) {
			 Repository.instance = new Repository()
		   } 
		
	  return Repository.instance
    }

    async addNewUser(user: UserModel): Promise<TokenInput> {
		 const data: UserEntity = this.userMapper.mapFrom(user)
		 const userData = await new User(data).save()

		 if(userData) {

			 const tokenPayload: TokenInput = {
			 id: userData._id,
			 roles: userData.roles,
			 isVerified: userData.isVerified,
			 authTypes: userData.authTypes
			 }

			 // update user lastSignIn

			 userData.lastSignedInAt = new Date().getTime()

			 return  new Promise((resolve) => resolve(tokenPayload))
        
			 }
       
			 return new Promise((resolve, reject) => reject())
    }

    async authenticateUser(details: Credential): Promise<TokenInput> {
		 const user = await User.find(details)

		 if(user) {

			 const tokenPayload: TokenInput = {
				 id: user._id,
				 roles: user.roles,
				 isVerified: user.isVerified,
				 authTypes: user.authTypes
			 }

			  // update user lastSignIn

			  user.lastSignedInAt = new Date().getTime()


			 return new Promise((resolve) => resolve(tokenPayload))
			 }
			 
			 return new Promise((resolve, reject) => reject())
    }


	 async userDetails(userId: string): Promise<UserModel> {
		 const user = await User.find({_id: userId})

		 if(user) {

			 return new Promise((resolve) => resolve(user))

			 }
			 
			 return new Promise((resolve, reject) => reject())
		 }
	
	
    async userTokenData(id: string): Promise<TokenInput> {
		 const user = await User.find({_id: id})
   
			 if(user) {

				 const tokenPayload: TokenInput = {
					 id: user._id,
					 roles: user.roles,
					 isVerified: user.isVerified,
					 authTypes: user.authTypes
				 }
   
				 return new Promise((resolve) => resolve(tokenPayload))
   
				 }
				
				 return new Promise((resolve, reject) => reject())
			 }


    async updateUserRole(roleInput: RoleInput): Promise<boolean> {
		 
		 const user = await User.find({_id: roleInput.userId})
   
			 if(user) {

				 const userRoles = {
					 stranerd: {
					 isAdmin: roleInput.app == 'stranerd' && roleInput.value && roleInput.role == 'isAdmin',
					 isModerator: roleInput.app == 'stranerd' && roleInput.value && roleInput.role == 'isModerator'
				 },
				 tutorStack: {
				    isAdmin: roleInput.app == 'tutorStack' && roleInput.value && roleInput.role == 'isAdmin',
				    isModerator: roleInput.app == 'tutorStack' && roleInput.value && roleInput.role == 'isModerator'
			     },
				 brainBox: {
				    isAdmin: roleInput.app == 'brainBox' && roleInput.value && roleInput.role == 'isAdmin',
				    isModerator: roleInput.app == 'brainBox' && roleInput.value && roleInput.role == 'isModerator'
				 }
			   }
                
				 user.roles = userRoles

				 // clear accessToken
				 await deleteCachedAccessToken(roleInput.userId)
				
				 return new Promise((resolve) => resolve(true))
			  }
					
				 return new Promise((resolve, reject) => reject(false))
	 }


    async GetRefreshToken(tokens: Tokens): Promise<AuthOutput> {

		 const newTokens = await exchangeOldForNewTokens(tokens,this.userTokenData)

		 const userData = await verifyRefreshToken(tokens.refreshToken) 

		 if (newTokens) {
          
			 const user = await this.userDetails(userData.id)

			 const result = {
				 accessToken: newTokens.accessToken,
				 refreshToken: newTokens.refreshToken,
				 user
			 }

				 
		  return  new Promise((resolve) => resolve(result))
				
	     }

		 return new Promise((resolve, reject) => reject())
    }

	 async clearUserAuthCache(userId: string): Promise<boolean> {
        
		 await deleteCachedAccessToken(userId)
		 await deleteCachedRefreshToken(userId)
         
		 return  new Promise((resolve) => resolve(true))

		
	 }


}