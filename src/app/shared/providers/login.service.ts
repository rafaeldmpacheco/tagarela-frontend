import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { API } from '../../../config/config';

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
      let url = `${API.URL}/authenticate`;
      return this.httpClient.post(url, user).map((response: any) => {
        this.setStorage(response);
        return response;
      });
    } catch (e) {
      return Observable.throw(e);
    }
  }

  public newUser(user: any): Observable<any> {
    try {
      let url = `${API.URL}/register`;
      return this.httpClient.post(url, user).map((response: any) => {
        this.setStorage(response);
        return response;
      });
    } catch (e) {
      return Observable.throw(e);
    }
  }

  public me(id: string): Observable<any> {
    try {
      let url = `${API.URL}/me/${id}`;
      return this.httpClient.get(url).map((response: any) => {
        this.setStorage(response);
        return response;
      });
    } catch (e) {
      return Observable.throw(e);
    }
  }

  public linkUser(body): Observable<any> {
    try {
      let url = `${API.URL}/linkUser`;
      return this.httpClient.post(url, body);
    } catch (e) {
      return Observable.throw(e);
    }
  }

  isTeacher() {
    if (this.getUser()) {
      return this.getUser().roles.find(role => role === 'TEACHER');
    }
    return false;
  }

  private setStorage(response) {
    this.setUser(response.user);
    localStorage.setItem('user', JSON.stringify(response.user));
    localStorage.setItem('token', response.token);
  }
}
