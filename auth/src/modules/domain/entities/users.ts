import { AuthRoles, AuthTypes, BaseEntity, MediaOutput } from '@utils/commons'

export class UserEntity extends BaseEntity {
	public readonly id: string
	public readonly email: string
	public readonly password: string
	public readonly firstName: string
	public readonly lastName: string
	public readonly photo: MediaOutput | null
	public readonly referrer: string | null
	public readonly isVerified: boolean
	public readonly authTypes: AuthTypes[]
	public readonly roles: AuthRoles
	public readonly lastSignedInAt: number
	public readonly signedUpAt: number

	constructor (data: UserConstructorArgs) {
		super()
		this.id = data.id
		this.email = data.email
		this.password = data.password
		this.firstName = data.firstName
		this.lastName = data.lastName
		this.photo = data.photo
		this.referrer = data.referrer
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
	referrer: string | null;
	isVerified: boolean;
	authTypes: AuthTypes[];
	lastSignedInAt: number;
	signedUpAt: number
}