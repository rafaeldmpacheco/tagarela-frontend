import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from '../../../config/config';

@Injectable()
export class ModulesService {
  constructor(private httpClient: HttpClient) {}

  public getModules(): Observable<any> {
    let url = `${API.URL}/modules`;
    return this.httpClient.get(url);
  }

  public newModule(module: any): Observable<any> {
    let url = `${API.URL}/module`;
    return this.httpClient.post(url, module);
  }

  public updateModule(module: any): Observable<any> {
    let url = `${API.URL}/module/` + module._id;
    return this.httpClient.put(url, module);
  }
}
