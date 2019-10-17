import { Component } from '@angular/core';
import { NavParams, ViewController, NavController } from 'ionic-angular';
import { BoardService } from '../../../providers/board.service';
import { Camera } from '@ionic-native/camera';
import { CategoryPage } from '../../category/category';

@Component({
	selector: 'symbol-modal',
	templateUrl: 'symbol-modal.html'
})
export class SymbolModal {
	public name: any;
	public description: any;
	public type: any;
	private boardIndex: any;

	constructor(
		private navParams: NavParams,
		private viewCtrl: ViewController,
		private camera: Camera,
		private boardService: BoardService,
		private navCtrl: NavController
	) {
		if (this.navParams.get('boardIndex')) {
			this.boardIndex = this.navParams.get('boardIndex');
		}
	}

	viewDismiss() {
		this.viewCtrl.dismiss();
	}

	newImage(index): void {
		// let loading: any = this.loadingService.createLoadingPage('Aguarde...');
		// loading.present();
		// const options: CameraOptions = {
		// 	destinationType: this.camera.DestinationType.DATA_URL,
		// 	sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
		// 	allowEdit: true,
		// 	saveToPhotoAlbum: true,
		// 	targetWidth: 2210,
		// 	targetHeight: 2210,
		// 	quality: 100
		// };
		// this.camera
		// 	.getPicture(options)
		// 	.then(imageData => {
		// 		this.board.images[index] = 'data:image/jpeg;base64,' + imageData;
		// 		loading.dismiss();
		// 	})
		// 	.catch(error => {
		// 		console.log(error);
		// 		loading.dismiss();
		// 	});
	}

	register() {
		// let loading: any = this.loadingService.createLoadingPage('Aguarde...');
		// loading.present();
		const newSymbol = {
			name: this.name,
			description: this.description
		};
		
		this.boardService.newSymbol(newSymbol).subscribe(
			() => {
				this.navCtrl.push(CategoryPage, {
					newSymbol: newSymbol,
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
