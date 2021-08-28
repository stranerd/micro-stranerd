import { UserBio } from '../types/users'
import { BaseEntity } from '@utils/commons'
import { capitalize } from '@utils/commons'

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

export const generateDefaultBio = (bio: Partial<UserBio>): UserBio => {
	const first = capitalize(bio?.firstName ?? 'Anon')
	const last = capitalize(bio?.lastName ?? 'Ymous')
	const email = bio?.email ?? 'anon@ymous.com'
	const avatar = bio?.photo ?? null

	return { firstName: first, lastName: last, email, photo: avatar }
}
