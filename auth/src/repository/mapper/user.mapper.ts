import { Mapper } from '../../application/base'
import { UserModel } from '../../application/domain'
import { UserEntity } from '../entities/user.entity'
import * as bcrypt from 'bcrypt'

const saltRounds = 10

const hashPassword = function (password: string | undefined | null,saltRounds:number)  {
	
	 if(password != null && password != undefined){

		 bcrypt.hash(password, saltRounds, function(err, hash) {
			if(err){
				return ''
			}
			return hash
		})
	 }else {
		 return ''
	 }

	 return
}

export class UserMapper extends Mapper<UserModel, UserEntity> {
	mapFrom (param: UserModel): UserEntity {
		return {
			_id: null,
			email: param.email,
			password: hashPassword(param.password,saltRounds),
			roles: param.roles,
			firstName: param.firstName,
			lastName: param.lastName,
			photo: param.photo,
			isVerified: param.isVerified,
			authTypes: param.authTypes,
			lastSignedInAt: param.lastSignedInAt,
			signedUpAt: param.signedUpAt
		}
	}

	mapTo (param: UserEntity): UserModel {
		return {
			_id: param._id,
			email: param.email,
			password: param.password,
			roles: param.roles,
			firstName: param.firstName,
			lastName: param.lastName,
			photo: param.photo,
			isVerified: param.isVerified,
			authTypes: param.authTypes,
			lastSignedInAt: param.lastSignedInAt,
			signedUpAt: param.signedUpAt
		}
	}
}