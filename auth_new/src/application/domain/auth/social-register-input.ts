export interface SocialRegisterInput {
    email: string;
    name: string;
    password?: string | null;
    photoUrl?: string | null;
    type: string; 
}