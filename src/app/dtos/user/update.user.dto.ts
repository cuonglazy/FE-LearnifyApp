export class UpdateUserDTO {
    fullname: string;    
    address: string;    
    password: string;
    phone_number: string; 
    retype_password: string;    
    date_of_birth: Date;    
    
    constructor(data: any) {
        this.fullname = data.fullname;
        this.address = data.address;
        this.password = data.password;
        this.phone_number = data.phone_number;
        this.retype_password = data.retype_password;
        this.date_of_birth = data.date_of_birth;        
    }
}