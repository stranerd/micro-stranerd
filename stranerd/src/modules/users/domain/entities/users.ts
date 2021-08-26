import { UserBio } from '../types/users'
import { BaseEntity } from '@utils/commons'

export class UserEntity extends BaseEntity {
	public bio: UserBio

	constructor ({ bio }: UserConstructorArgs) {
		super()
		this.bio = bio
	}
}

type UserConstructorArgs = {
	bio: UserBio
}