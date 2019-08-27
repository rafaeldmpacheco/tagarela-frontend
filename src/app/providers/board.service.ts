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

}
