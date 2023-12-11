import { Role } from "./role";
import { UserImage } from "./user.image";
export interface User {
    id: number;
    fullName: string;
    phoneNumber: string;
    email: string;
    address: string;
    password: string;
    active: boolean;
    dateOfBirth: Date;
    facebook_account_id: number;
    google_account_id: number;
    image_url: string;
    url: string;
    role_id: Role;
    user_image: UserImage;
}
