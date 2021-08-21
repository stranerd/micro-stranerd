/* eslint-disable no-unused-vars */
import {  RoleInput, UserModel } from '../../domain'

export interface IUserRepository {

	userDetails (userId: string): Promise<UserModel>;

	updateUserRole (roleInput: RoleInput): Promise<boolean>;
}