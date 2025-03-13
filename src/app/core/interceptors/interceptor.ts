import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private getAuthorizationHeader(): string {
    const { username, password } = environment;
    const credentials = btoa(`${username}:${password}`);
    return `Basic ${credentials}`;
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Cria um novo objeto de headers, garantindo que a imutabilidade do HttpRequest seja respeitada.
    const headers = req.headers
      .set('Authorization', this.getAuthorizationHeader())
      .set('Content-Type', 'application/json; charset=utf-8')
      .set('Accept', '*/*');

    // Clona o request com os novos headers.
    const authReq = req.clone({ headers });

    return next.handle(authReq);
  }
}
