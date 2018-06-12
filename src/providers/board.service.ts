import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

import {Observable} from "rxjs";

@Injectable()
export class BoardService {

	private boardImages: any[];

	constructor(private httpClient: HttpClient) {
	}

	public saveBoardImages(boardImages: any[]): void {
		this.boardImages = boardImages;
	}

	public getBoardImages(): any[] {
		return this.boardImages;
	}

}
