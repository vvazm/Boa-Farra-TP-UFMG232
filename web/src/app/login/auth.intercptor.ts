import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    
    constructor(private loginService: LoginService) {}

    

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.loginService.getUserToken();

        if (!token) {
            return next.handle(request);
        }

        const authReq = request.clone({
            headers: request.headers.set('Authorization', 'Bearer ' + token)
        });

        return next.handle(authReq);
    }
}