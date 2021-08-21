import { UserPhoto } from './photo'

export interface UserUpdateInput {
	firstName: string;
	lastName: string;
	photo: UserPhoto;
	userId?: string;
}
