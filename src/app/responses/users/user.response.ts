import { Role } from "src/app/models/role";
import { UserImage } from "src/app/models/user.image";

export interface UserResponse {
    id: number;
    fullname: string;
    phone_number: string;
    email: string;
    address: string;
    password: string;
    date_of_birth: Date;
    is_active: boolean;
    facebook_account_id: number;
    google_account_id: number;
    role_id: Role;
}