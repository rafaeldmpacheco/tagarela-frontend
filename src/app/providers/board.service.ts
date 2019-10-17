import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class BoardService {
	haveNewBoard: any = new Subject();

	constructor(private httpClient: HttpClient) {}

	public saveBoardImages(board: any): Observable<any> {
		let url: string = `https://tagarela-backend.herokuapp.com/board`;
		return this.httpClient.post(url, board);
	}

	public updateBoardImages(board: any): Observable<any> {
		let url: string = `https://tagarela-backend.herokuapp.com/board/` + board._id;
		return this.httpClient.put(url, board);
	}

	public getBoardsByPlan(planId): Observable<any> {
		let url: string = `https://tagarela-backend.herokuapp.com/boards/${planId}/plan`;
		return this.httpClient.get(url);
	}

	public getPlans(): Observable<any> {
		let url: string = `https://tagarela-backend.herokuapp.com/plans`;
		return this.httpClient.get(url);
	}

	public newPlan(plan): Observable<any> {
		let url: string = `https://tagarela-backend.herokuapp.com/plan`;
		return this.httpClient.post(url, plan);
	}

	public getSymbols(): Observable<any> {
		const mockSymbols = [
			{
				id: 1,
				name: 'name 1',
				description: 'description 1',
				category: {
					id: 1,
					name: 'name 1',
					description: 'description 1',
					color: '#333'
				}
			},
			{
				id: 2,
				name: 'name 2',
				description: 'description 2'
			}
		];
		return Observable.of(mockSymbols);
	}

	public newSymbol(newSymbol): Observable<any> {
		return Observable.of(newSymbol);
	}

	public getCategories(): Observable<any> {
		const mockSymbols = [
			{
				id: 1,
				name: 'name 1',
				description: 'description 1',
				color: '#333'
			},
			{
				id: 2,
				name: 'name 2',
				description: 'description 2',
				color: '#333'
			}
		];
		return Observable.of(mockSymbols);
	}

	public newCategory(newCategory): Observable<any> {
		return Observable.of(newCategory);
	}
}
