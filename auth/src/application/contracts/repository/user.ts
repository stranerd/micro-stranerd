import { RoleInput, SocialRegisterInput, TokenInput, UserModel, UserUpdateInput } from '../../domain'

export interface IUserRepository {

	userDetails (userId: string, dataType?: string): Promise<UserModel>;

	updateUserRole (roleInput: RoleInput): Promise<boolean>;

	updateDetails (credentials: SocialRegisterInput): Promise<TokenInput>

	updateUserProfile (input: UserUpdateInput): Promise<boolean>
}