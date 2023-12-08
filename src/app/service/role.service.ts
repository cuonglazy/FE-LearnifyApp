import { Injectable } from '@angular/core'
import { environment } from '../environments/environment'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class RoleService {
    private apiGETRoles = `${environment.apiBaseUrl}/roles`

    constructor(private httpClient: HttpClient) {

    }

    getRoles(): Observable<any> {
        return this.httpClient.get<any[]>(this.apiGETRoles);
    }
}