import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { LoadingSpinnerService } from './loading-spinner.service';


@Injectable()
export class LoadingSpinnerInterceptor implements HttpInterceptor {

    constructor(private loadingSpinnerService: LoadingSpinnerService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.loadingSpinnerService.addPending();
        return next.handle(request).pipe(
          finalize(() => this.loadingSpinnerService.removePending())
        );
    }
}