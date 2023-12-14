import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ISection } from "src/app/pages/section/section.model";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: "root",
})
export class HomeService {
    protected resourceUrl = `${environment.apiBaseUrl}`;
    protected token = `eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Im5nb3NvbnRydW9uZzc1QGdtYWlsLmNvbSIsInN1YiI6Im5nb3NvbnRydW9uZzc1QGdtYWlsLmNvbSIsImV4cCI6MTcwNDg1ODUzMn0.VcdC6iyRGe3qW5ykMxXnU5RRU-KwGLqcZYH2hwLun9w`;
    constructor(protected http: HttpClient) {}

    // getAllCategory(): Observable<any>{
    //     return this.http.get<ISection[]>(`${this.resourceUrl}/sections`, {
    //         observe:
    // }
}