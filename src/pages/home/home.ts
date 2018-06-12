import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {ManageBoardPage} from "../manage-board/manage-board";
import {BoardService} from "../../providers/board.service";
import {CurrentBoardPage} from "../current-board/current-board";

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {

	public boardImages: any[];

	constructor(private navCtrl: NavController,
				private boardService: BoardService) {
	}

	cadastrarPrancha() {
		this.navCtrl.push(ManageBoardPage)
	}

	getBoard() {
		this.boardImages = this.boardService.getBoardImages();
		this.navCtrl.push(CurrentBoardPage, {boardImages: this.boardImages});
	}
}
