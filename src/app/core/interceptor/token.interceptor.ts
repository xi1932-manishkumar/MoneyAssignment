import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    token = '4b3754d947c4f7013f0e472ca329de32ec789f1e0ceded50ac071a0edf25770a';

    constructor() {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
        request = request.clone({
        setHeaders: {
                Authorization: `Bearer ${this.token}`
            }
        });
    return next.handle(request);
  }
}
