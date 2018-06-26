import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

import {Observable} from "rxjs";

@Injectable()
export class BoardService {

	constructor(private httpClient: HttpClient) {
	}

	public saveBoardImages(board: any): Observable<any> {
		let url: string = `https://tagarela-backend.herokuapp.com/api/board/newBoard`;
		return this.httpClient.post(url, board);
	}

	public getBoardImages(): Observable<any> {
		let url: string = `https://tagarela-backend.herokuapp.com/api/board/boards`;
		return this.httpClient.get(url);
	}

}
