import {
    IsString, IsNotEmpty, IsEmail, IsDate
} from 'class-validator';

export class RegisterDTO {
    @IsString()
    fullname: string;

    @IsString()
    phone_number: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    address: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    retype_password: string;
    
    facebook_account_id: number = 0;
    google_account_id: number = 0;

    @IsDate()
    @IsNotEmpty()
    dob: Date;

    role_id: number = 1;

    constructor(data: any) {
        this.fullname = data.fullName;
        this.phone_number = data.phone_number;
        this.email = data.email;
        this.address = data.address;
        this.retype_password = data.retype_password;
        this.facebook_account_id = data.facebook_account_id || 0;
        this.google_account_id = data.google_account_id || 0;
        this.dob = data.dob;
        this.role_id = data.role_id || 1
    }   
}