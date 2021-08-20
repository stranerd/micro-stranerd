export interface RefreshTokenModel {
	_id?: string | null;
	user: string | null | undefined;
	token: string;
	expires: Date;
	created: Date;
	revoked?: Date | null;
	replacedByToken?: String | null;
	isActive: Boolean
}