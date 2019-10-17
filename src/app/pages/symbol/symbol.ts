import { Component } from '@angular/core';
import { ModalController, NavController, NavParams } from 'ionic-angular';
import { BoardService } from '../../providers/board.service';
import { LoginService } from '../../providers/login.service';
import { ManageBoardPage } from '../board/manage-board/manage-board';
import { SymbolModal } from './symbol-modal/symbol-modal';

@Component({
	selector: 'page-symbol',
	templateUrl: 'symbol.html'
})
export class SymbolPage {
	public symbols: any[] = [];
	public user: any;
	private boardIndex: number;

	constructor(
		private navCtrl: NavController,
		private loginService: LoginService,
		public modalCtrl: ModalController,
		private boardService: BoardService,
		private navParams: NavParams
	) {
		this.user = this.loginService.getUser();

		this.boardService.getSymbols().subscribe(response => {
			this.symbols = response;
		});

		if (this.navParams.get('boardIndex')) {
			this.boardIndex = this.navParams.get('boardIndex');
		}
	}

	cadastrarSimbolo() {
		let symbolModal = this.modalCtrl.create(SymbolModal);
		symbolModal.present();
	}

	goToBoard(newSymbol) {
		this.navCtrl.push(ManageBoardPage, { newSymbol: newSymbol, boardIndex: this.boardIndex });
	}
}
