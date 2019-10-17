import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BoardService } from '../../../providers/board.service';
import { LoadingService } from '../../../providers/loading.service';
import { SymbolPage } from '../../symbol/symbol';

@Component({
	selector: 'manage-board',
	templateUrl: 'manage-board.html'
})
export class ManageBoardPage implements OnInit {
	public board: any = { name: '', images: ['', '', '', '', '', '', '', '', ''] };

	constructor(
		private navCtrl: NavController,
		private boardService: BoardService,
		private loadingService: LoadingService,
		private navParams: NavParams
	) {}

	ngOnInit(): void {
		if (this.navParams) {
			const index = this.navParams.get('boardIndex');
			const symbol = this.navParams.get('newSymbol');

			this.board.images[index] = symbol;
		}
	}

	newImage(index): void {
		this.navCtrl.push(SymbolPage, { boardIndex: index });
	}

	saveBoard(): void {
		let loading: any = this.loadingService.createLoadingPage('Aguarde...');
		loading.present();

		this.boardService.saveBoardImages(this.board).subscribe(
			() => {
				this.boardService.haveNewBoard.next();
				this.navCtrl.pop();
				loading.dismiss();
			},
			err => {
				console.log(err);
				loading.dismiss();
			}
		);
	}

	updateBoard(): void {
		let loading: any = this.loadingService.createLoadingPage('Aguarde...');
		loading.present();

		if (this.board.images.some(image => image != '')) {
			this.boardService.updateBoardImages(this.board).subscribe(
				() => {
					this.boardService.haveNewBoard.next();
					this.navCtrl.pop();
					loading.dismiss();
				},
				err => {
					console.log(err);
					loading.dismiss();
				}
			);
		}
	}

	selectedImage(index) {
		console.log('play sound');
	}

	private mockImage =
		'https://static1.squarespace.com/static/55fc0004e4b069a519961e2d/t/55fc301ae4b01342ae9212a1/1442590746805/';
}
