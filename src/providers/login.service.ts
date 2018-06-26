import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

import {Observable} from "rxjs";

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

	constructor(private httpClient: HttpClient) {
	}

	public authenticate(email: string, password: string): Observable<any> {
		try {
			this.email = email;
			let user = {
				name: email,
				password: password
			};
			let url: string = `https://tagarela-backend.herokuapp.com/api/login/authenticate`;
			return this.httpClient.post(url, user);
		}
		catch (e) {
			return Observable.throw(e);
		}
	}

	public newUser(email: string, password: string, role: string): Observable<any> {
		try {
			let user = {
				name: email,
				password: password,
				role: role
			};
			let url: string = `https://tagarela-backend.herokuapp.com/api/login/newUser`;
			return this.httpClient.post(url, user);
		}
		catch (e) {
			return Observable.throw(e);
		}
	}

}
