import {AfterViewInit, Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {ManageBoardPage} from "./manage-board/manage-board";
import {BoardService} from "../../providers/board.service";
import {CurrentBoardPage} from "./current-board/current-board";
import {LoginService} from "../../providers/login.service";
import {LoadingService} from "../../providers/loading.service";

@Component({
	selector: 'page-board',
	templateUrl: 'board.html'
})
export class BoardPage implements AfterViewInit {

	public boardImages: any[] = [];
	public user: any;

	constructor(private navCtrl: NavController,
				private loginService: LoginService,
				private loadingService: LoadingService,
				private boardService: BoardService) {
		this.user = this.loginService.getUser();

		this.boardService.haveNewBoard.subscribe(() => {
			this.getBoardImages();
		});
	}

	cadastrarPrancha() {
		this.navCtrl.push(ManageBoardPage)
	}

	getBoard(board) {
		if (this.user && (this.user.role === 'TEACHER' || this.user.role === 'teacher')) {
			this.navCtrl.push(ManageBoardPage, {boardImages: board});
		} else {
			this.navCtrl.push(CurrentBoardPage, {boardImages: board});
		}
	}

	ngAfterViewInit(): void {
		this.getBoardImages();
	}


	private getBoardImages() {
		let loading: any = this.loadingService.createLoadingPage("Aguarde...");
		loading.present();

		this.boardService.getBoardImages().subscribe(boards => {
			this.boardImages = boards;
			loading.dismiss();
		}, (e) => {
			console.log(e);
			loading.dismiss();
		})
	}
}
