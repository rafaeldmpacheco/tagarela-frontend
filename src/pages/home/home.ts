import {AfterViewInit, Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {ManageBoardPage} from "../manage-board/manage-board";
import {BoardService} from "../../providers/board.service";
import {CurrentBoardPage} from "../current-board/current-board";
import {LoginService} from "../../providers/login.service";

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage implements AfterViewInit {

	public boardImages: any[] = [];
	public user: any;

	constructor(private navCtrl: NavController,
				private loginService: LoginService,
				private boardService: BoardService) {
		this.user = this.loginService.getUser();
	}

	cadastrarPrancha() {
		this.navCtrl.push(ManageBoardPage)
	}

	getBoard(board) {
		if (this.user && this.user.role === 'TEACHER') {
			this.navCtrl.push(ManageBoardPage, {boardImages: board});
		} else {
			this.navCtrl.push(CurrentBoardPage, {boardImages: board});
		}
	}

	ngAfterViewInit(): void {
		this.boardService.getBoardImages().subscribe(boards => {
			this.boardImages = boards;
		})
	}

}
