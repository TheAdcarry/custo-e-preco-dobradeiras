import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiUrls } from '../../api/api.config';

@Injectable({
  providedIn: 'root',
})
export class ReprocessaPrecosService {
  private readonly apiUrl = ApiUrls.REPROCESSA;

  constructor(private readonly http: HttpClient) {}

  sendData(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
