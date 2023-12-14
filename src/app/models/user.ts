import { Role } from "./role";
import { UserImage } from "./user.image";
export interface User {
    id?: number;
    fullname?: string;
    phone_number?: string;
    email?: string;
    address?: string;
    password?: string;
    active?: boolean;
    date_of_birth?: Date;
    facebook_account_id?: number;
    google_account_id?: number;
    url?: string;
    role_id?: Role;
    image_url?: UserImage[];
}

// export interface UserImage {
//     id?: number;
//     image_url?: UserImage[];
//     // user_id: number;
// }

// export class IUserImage implements UserImage {
//     constructor (
//         public id?: number,
//         public image_url?: UserImage[],
//         // public user_id?: number,
//     ) {

//     }
// }

export class IUser implements User {
    constructor (public id?: number,
        public fullname?: string,
        public phone_number?: string,
        public email?: string,
        public address?: string,
        public password?: string,
        public active?: boolean,
        public date_of_birth?: Date,
        public facebook_account_id?: number,
        public google_account_id?: number,
        public url?: string,
        public role_id?: Role,
        public image_url?: UserImage[]
        ) {
        this.active = this.active ?? true;

        }
        
}