import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiUrls } from '../api/api.config';

@Injectable({
    providedIn: 'root',
})
export class ReprocessaPrecosService {
    private apiUrl = ApiUrls.REPROCESSA

    constructor(private http: HttpClient) { }

    sendData(data: any): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });

        return this.http.post(this.apiUrl, data, { headers });
    }
}
