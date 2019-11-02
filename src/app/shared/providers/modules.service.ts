import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { App } from 'ionic-angular';
import { Observable } from 'rxjs';
import { API } from '../../../config/config';
import { GridMenuComponent } from '../components/grid-menu/grid-menu.component';

@Injectable()
export class ModulesService {
  constructor(private httpClient: HttpClient, private app: App) {}

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

  goToMenu(modules) {
    localStorage.setItem('modules', JSON.stringify(modules));
    this.app.getActiveNav().push(GridMenuComponent);
  }
}
