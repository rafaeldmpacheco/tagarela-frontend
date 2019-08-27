import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";

@Injectable()
export class LoginService {
	private email: string;
	public user: any;

	setUser(user) {
		this.user = user;
	}

	getUser() {
		return this.user;
	}

	getEmail() {
		return this.email;
	}

	constructor(private httpClient: HttpClient) {}

	public authenticate(email: string, password: string): Observable<any> {
		try {
			this.email = email;
			let user = { email, password };
			let url: string = `https://tagarela-backend.herokuapp.com/authenticate`;
			return this.httpClient.post(url, user);
		} catch (e) {
			return Observable.throw(e);
		}
	}

	public newUser(user: any): Observable<any> {
		try {
			let url: string = `https://tagarela-backend.herokuapp.com/register`;
			return this.httpClient.post(url, user);
		} catch (e) {
			return Observable.throw(e);
		}
	}

	public updateUser(user): Observable<any> {
		try {
			let url: string =
				"https://tagarela-backend.herokuapp.com/api/login/user/" + user._id;
			return this.httpClient.put(url, {
				name: user.name,
				password: user.password
			});
		} catch (e) {
			return Observable.throw(e);
		}
	}
}
