import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { App } from 'ionic-angular';
import { Observable } from 'rxjs';
import { LoginPage } from '../pages/login/login';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
	constructor(private app: App) {}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const token = localStorage.getItem('token');

		if (token) {
			request = request.clone({
				setHeaders: {
					Authorization: `Bearer ${token}`
				}
			});
		}

		if (!request.headers.has('Content-Type')) {
			request = request.clone({
				setHeaders: {
					'content-type': 'application/json'
				}
			});
		}

		request = request.clone({
			headers: request.headers.set('Accept', 'application/json')
		});

		return next.handle(request).catch(error => {
			if (error.status === 401) {
				this.app.getRootNav().push(LoginPage);
			}
			return Observable.throw(error);
		}) as any;
	}
}
