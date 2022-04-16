export type RefreshUser = { id: string } & Record<string, any>
export type AuthUser = { id: string } & Record<string, any>

export enum AuthTypes {
	google = 'google',
	email = 'email',
	facebook = 'facebook',
	twitter = 'twitter',
	github = 'github',
	microsoft = 'microsoft'
}