import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

import {Observable} from "rxjs";

@Injectable()
export class LoginService {

	constructor(private httpClient: HttpClient) {
	}

	public authenticate(email: string, password: string): Observable<any> {
		try {
			let user = {
				name: email,
				password: password
			};
			let url: string = `http://localhost:3000/api/login/authenticate`;
			return this.httpClient.post(url, user);
		}
		catch (e) {
			return Observable.throw(e);
		}
	}


}
