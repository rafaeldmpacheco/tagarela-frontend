import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Subject} from "rxjs/Subject";

@Injectable()
export class BoardService {

	haveNewBoard: any = new Subject();

	constructor(private httpClient: HttpClient) {
	}

	public saveBoardImages(board: any): Observable<any> {
		let url: string = `https://tagarela-backend.herokuapp.com/api/board/newBoard`;
		return this.httpClient.post(url, board);
	}

	public updateBoardImages(board: any): Observable<any> {
		let url: string = `https://tagarela-backend.herokuapp.com/api/board/update/` + board._id;
		return this.httpClient.put(url, board);
	}

	public getBoardImages(): Observable<any> {
		let url: string = `https://tagarela-backend.herokuapp.com/boards`;
		return this.httpClient.get(url);
	}

	public deleteBoardImages(id: string): Observable<any> {
		let url: string = `https://tagarela-backend.herokuapp.com/api/board/delete/` + id;
		return this.httpClient.delete(url);
	}

	public getPlans(): Observable<any> {
		// let url: string = `https://tagarela-backend.herokuapp.com/plans`;
		// return this.httpClient.get(url);
		const mockPlans = [{
			id: 1,
			name: 'name 1',
			description: 'description 1'
		},{
			id: 2,
			name: 'name 2',
			description: 'description 2'
		}]
		return Observable.of(mockPlans);
	}

	public newPlan(plan): Observable<any> {
		// let url: string = `https://tagarela-backend.herokuapp.com/plans`;
		// return this.httpClient.get(url);
		const mockPlans = [{
			name: 'name 1',
			description: 'description 1',
			type: "tipo"
		},{
			name: 'name 2',
			description: 'description 2',
			type: "tipo"
		}]
		mockPlans.push(plan)
		return Observable.of(mockPlans);
	}

}
