import { MediaOutput } from '@utils/commons'

export interface UserUpdateInput {
	firstName: string;
	lastName: string;
	photo: MediaOutput;
	userId?: string;
}
