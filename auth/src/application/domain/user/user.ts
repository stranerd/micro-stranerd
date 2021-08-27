import { AuthRoles, AuthTypes, BaseEntity, MediaOutput } from '@utils/commons'

export class UserEntity extends BaseEntity {
	public id: string
	public email: string
	public password: string
	public firstName: string
	public lastName: string
	public photo: MediaOutput | null
	public isVerified: boolean
	public authTypes: AuthTypes[]
	public roles: AuthRoles
	public lastSignedInAt: number
	public signedUpAt: number

	constructor (data: UserConstructorArgs) {
		super()
		this.id = data.id
		this.email = data.email
		this.password = data.password
		this.firstName = data.firstName
		this.lastName = data.lastName
		this.photo = data.photo
		this.isVerified = data.isVerified
		this.authTypes = data.authTypes
		this.roles = data.roles
		this.lastSignedInAt = data.lastSignedInAt
		this.signedUpAt = data.signedUpAt
	}
}

export interface UserConstructorArgs {
	id: string;
	email: string;
	password: string;
	roles: AuthRoles;
	firstName: string;
	lastName: string;
	photo: MediaOutput | null;
	isVerified: boolean;
	authTypes: AuthTypes[];
	lastSignedInAt: number;
	signedUpAt: number
}