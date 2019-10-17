import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { BoardService } from '../../../providers/board.service';
import { ManageBoardPage } from '../../board/manage-board/manage-board';

@Component({
	selector: 'category-modal',
	templateUrl: 'category-modal.html'
})
export class CategoryModal {
	public name: any;
	public description: any;
	public color: any;
	public boardIndex: any;
	public newSymbol: any;

	constructor(
		private navParams: NavParams,
		private viewCtrl: ViewController,
		private navCtrl: NavController,
		private boardService: BoardService
	) {
		if (this.navParams.get('boardIndex')) {
			this.boardIndex = this.navParams.get('boardIndex');
			this.newSymbol = this.navParams.get('newSymbol');
		}
	}

	viewDismiss() {
		this.viewCtrl.dismiss();
	}

	register() {
		// let loading: any = this.loadingService.createLoadingPage('Aguarde...');
		// loading.present();
		const newCategory = { name: this.name, description: this.description, color: this.color };

		this.boardService
			.newCategory({ name: this.name, description: this.description, color: this.color })
			.subscribe(
				() => {
					this.viewDismiss();

					this.newSymbol.category = newCategory;

					this.navCtrl.push(ManageBoardPage, {
						newSymbol: this.newSymbol,
						boardIndex: this.boardIndex
					});
					// loading.dismiss();
				},
				e => {
					// loading.dismiss();
					console.log(e);
				}
			);
	}
}
