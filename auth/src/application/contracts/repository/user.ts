import { RegisterInput, RoleInput, TokenInput, UserEntity, UserUpdateInput } from '../../domain'

export interface IUserRepository {

	userDetails (userId: string, dataType: string): Promise<UserEntity | null>;

	updateUserRole (roleInput: RoleInput): Promise<boolean>;

	updateDetails (credentials: RegisterInput): Promise<TokenInput>

	updateUserProfile (input: UserUpdateInput): Promise<boolean>
}