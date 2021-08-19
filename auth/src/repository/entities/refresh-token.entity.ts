export interface RefreshTokenEntity {
    _id: string | null;
    user: string | null | undefined;
    token: string;
    expires: Date;
    created: Date;
    revoked?: Date | null;
    replacedByToken?: String | null;
}