import { Injectable } from '@angular/core'
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http'
import { Observable} from 'rxjs'
import { TokenService } from '../service/token.service';

@Injectable()
export class TokenInterceptors implements HttpInterceptor {
    constructor(private tokenService: TokenService) {

    }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.tokenService.getToken();
        if (token != null) {
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                },
            });
        }
        return next.handle(req);
    }
    //đăng ký 

}