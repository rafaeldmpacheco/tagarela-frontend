import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

import {Observable} from "rxjs";

@Injectable()
export class BoardService {

	private board: any;

	constructor(private httpClient: HttpClient) {
	}

	public saveBoardImages(board: any): void {
		this.board = board;
	}

	public getBoardImages(): any {
		return this.board;
	}

}
