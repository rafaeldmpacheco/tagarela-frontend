import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from '../../../config/config';

@Injectable()
export class BoardService {
  constructor(private httpClient: HttpClient) {}

  public getImage(fileId: string): Observable<any> {
    let url = `${API.URL}/file/${fileId}`;
    return this.httpClient.get(url);
  }

  public getMultipleSymbols(symbols: string[]): Observable<any> {
    let url = `${API.URL}/symbolsById`;
    return this.httpClient.post(url, symbols);
  }

  public getMultipleFiles(ids: string[]): Observable<any> {
    let url = `${API.URL}/files`;
    return this.httpClient.post(url, ids);
  }

  public saveBoard(board: any): Observable<any> {
    let url = `${API.URL}/board`;
    return this.httpClient.post(url, board);
  }

  public updateBoard(board: any): Observable<any> {
    let url = `${API.URL}/board/` + board._id;
    return this.httpClient.put(url, board);
  }

  public getBoardsByPlan(planId): Observable<any> {
    let url = `${API.URL}/board/${planId}`;
    return this.httpClient.get(url);
  }

  public getPlans(): Observable<any> {
    let url = `${API.URL}/plans`;
    return this.httpClient.get(url);
  }

  public getPlansByUser(owner: string): Observable<any> {
    let url = `${API.URL}/plan/${owner}`;
    return this.httpClient.get(url);
  }

  public newPlan(plan): Observable<any> {
    let url = `${API.URL}/plan`;
    return this.httpClient.post(url, plan);
  }

  public getSymbols(categoryId: string): Observable<any> {
    let url = `${API.URL}/symbol/${categoryId}`;
    return this.httpClient.get(url);
  }

  public newSymbol(newSymbol): Observable<any> {
    let url = `${API.URL}/symbol`;
    return this.httpClient.post(url, newSymbol);
  }

  public getCategories(): Observable<any> {
    let url = `${API.URL}/categories`;
    return this.httpClient.get(url);
  }

  public newCategory(newCategory): Observable<any> {
    let url = `${API.URL}/category`;
    return this.httpClient.post(url, newCategory);
  }
}
