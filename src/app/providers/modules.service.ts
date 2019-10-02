import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable()
export class ModulesService {
	constructor(private httpClient: HttpClient) {}

	public getModules(): Observable<any> {
		let url: string = `https://tagarela-backend.herokuapp.com/modules`;
		return this.httpClient.get(url);
	}

	public newModule(module: any): Observable<any> {
		let url: string = `https://tagarela-backend.herokuapp.com/module`;
		return this.httpClient.post(url, module);
	}

	public updateModule(module: any): Observable<any> {
		let url: string = `https://tagarela-backend.herokuapp.com/module/` + module._id;
		return this.httpClient.put(url, module);
	}
}
