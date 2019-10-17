import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BoardService } from '../../providers/board.service';
import { LoadingService } from '../../providers/loading.service';
import { LoginService } from '../../providers/login.service';
import { ManageBoardPage } from './manage-board/manage-board';

@Component({
	selector: 'page-board',
	templateUrl: 'board.html'
})
export class BoardPage {
	public boardImages: any[] = [];
	public user: any;
	public planId: string;
	public canEdit = false;

	constructor(
		private navCtrl: NavController,
		private loginService: LoginService,
		private loadingService: LoadingService,
		private boardService: BoardService,
		private navParams: NavParams
	) {
		this.user = this.loginService.getUser();
		this.canEdit = this.user.roles.find(role => role === 'TEACHER' || role === 'SPECIALIST');
		this.planId = this.navParams.data;
		this.getBoards();
	}

	cadastrarPrancha() {
		this.navCtrl.push(ManageBoardPage);
	}

	getBoard(board) {
		this.navCtrl.push(ManageBoardPage, { boardImages: board });
	}

	private getBoards() {
		let loading: any = this.loadingService.createLoadingPage('Aguarde...');
		loading.present();

		this.boardService.getBoardsByPlan(this.planId).subscribe(
			boards => {
				this.boardImages = boards;
				loading.dismiss();
			},
			e => {
				console.log(e);
				loading.dismiss();
			}
		);
	}
}
