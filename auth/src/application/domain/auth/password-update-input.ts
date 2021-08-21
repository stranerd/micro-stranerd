export interface PasswordUpdateInput {
	oldPassword: string;
	password: string;
	userId?: string;
}