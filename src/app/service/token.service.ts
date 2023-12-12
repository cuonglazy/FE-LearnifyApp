import { Injectable } from '@angular/core'
import { JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
    providedIn: 'root',
})
export class TokenService {
    private readonly TOKEN_KEY = 'access_token';
    private jwtHelperService = new JwtHelperService();
    
    constructor() {
    }

    getUserId(): number {
        //lay ra token
        let userObject = this.jwtHelperService.decodeToken(this.getToken() ?? '');
        //kiem tra trong token co userId khong (claims (BE) -> userId)
        return 'userId' in userObject ? parseInt(userObject['userId']) : 0;
    }

    //getter/setter
    getToken(): string | null {
        return localStorage.getItem(this.TOKEN_KEY);
    }

    setToken(token: string): void {
        localStorage.setItem(this.TOKEN_KEY, token);
    }

    removeToken(): void {
        localStorage.removeItem(this.TOKEN_KEY);
    }

    isTokenExpired(): boolean {
        if(this.getToken() == null) {
            return false;
        }
        return this.jwtHelperService.isTokenExpired(this.getToken());
    }
}