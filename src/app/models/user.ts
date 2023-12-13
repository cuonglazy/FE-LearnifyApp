import { Role } from "./role";
import { UserImage } from "./user.image";
export interface User {
    id?: number;
    fullName?: string;
    phoneNumber?: string;
    email?: string;
    address?: string;
    password?: string;
    active?: boolean;
    date_of_birth?: Date;
    facebook_account_id?: number;
    google_account_id?: number;
    image_url?: string;
    url?: string;
    role_id?: Role;
    user_image?: UserImage;
}

export class IUser implements User {
    constructor (public id?: number,
        public fullName?: string,
        public phoneNumber?: string,
        public email?: string,
        public address?: string,
        public password?: string,
        public active?: boolean,
        public date_of_birth?: Date,
        public facebook_account_id?: number,
        public google_account_id?: number,
        public image_url?: string,
        public url?: string,
        public role_id?: Role,
        public user_image?: UserImage
        ) {
        this.active = this.active ?? true;

        }
        
}
