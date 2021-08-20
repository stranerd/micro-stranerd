/* eslint-disable no-unused-vars */
import { RefreshTokenModel, TokenInput } from '../../domain'

export interface ITokenHandler {
	generateJwtToken (payload: TokenInput): Promise<string>;

	randomTokenString (): string;

	MakeRefreshTokenModel (token: String, userId: String | null): Promise<RefreshTokenModel>;
}