import { Component } from '@angular/core';
import { ModalController, NavController, NavParams } from 'ionic-angular';
import { BoardService } from '../../providers/board.service';
import { LoginService } from '../../providers/login.service';
import { ManageBoardPage } from '../board/manage-board/manage-board';
import { CategoryModal } from './category-modal/category-modal';

@Component({
	selector: 'page-category',
	templateUrl: 'category.html'
})
export class CategoryPage {
	public categories: any[] = [];
	public user: any;
	private boardIndex: number;
	private newSymbol: any;

	constructor(
		private navCtrl: NavController,
		private loginService: LoginService,
		public modalCtrl: ModalController,
		private boardService: BoardService,
		private navParams: NavParams
	) {
		this.user = this.loginService.getUser();

		this.boardService.getCategories().subscribe(response => {
			this.categories = response;
		});

		if (this.navParams.get('boardIndex')) {
			this.boardIndex = this.navParams.get('boardIndex');
			this.newSymbol = this.navParams.get('newSymbol');
		}
	}

	registerSymbol() {
		let categoryModal = this.modalCtrl.create(CategoryModal, {
			newSymbol: this.newSymbol,
			boardIndex: this.boardIndex
		});
		categoryModal.present();
	}

	goToBoard(category) {
		this.newSymbol.category = category;
		this.navCtrl.push(ManageBoardPage, { newSymbol: this.newSymbol, boardIndex: this.boardIndex });
	}
}
