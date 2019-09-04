import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable()
export class ModulesService {
	private mockModules = [
		{
			id: '0',
			title: 'Perfil',
			icon: 'contact',
			roles: ['TEACHER', 'STUDENT', 'SPECIALIST', 'ADMIN'],
			name: 'profile'
		},
		{
			id: '1',
			title: 'Pranchas',
			icon: 'clipboard',
			roles: ['TEACHER', 'STUDENT', 'SPECIALIST', 'ADMIN'],
			name: 'board'
		}
	];

	constructor(private httpClient: HttpClient) {}

	public getModules(): Observable<any> {
		try {
			return Observable.of(this.mockModules);
		} catch (e) {
			return Observable.throw(e);
		}
	}

	public newModule(module: any): Observable<any> {
		try {
			this.mockModules = [...this.mockModules, module];
			return Observable.of(this.mockModules);
		} catch (e) {
			return Observable.throw(e);
		}
	}

	public updateModule(module: any): Observable<any> {
		try {
			this.mockModules.forEach(item => {
				if (item.id === module.id) {
					item = module;
				}
			});
			return Observable.of(this.mockModules);
		} catch (e) {
			return Observable.throw(e);
		}
	}
}
