import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { BoardService } from '../../../providers/board.service';
import { Camera } from '@ionic-native/camera';

@Component({
	selector: 'symbol-modal',
	templateUrl: 'symbol-modal.html'
})
export class SymbolModal {
	public name: any;
	public description: any;
	public type: any;

	constructor(
		private navParams: NavParams,
		private viewCtrl: ViewController,
		private camera: Camera,
		private boardService: BoardService
	) {
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
		this.boardService.newPlan({name:this.name, description: this.description, type:this.type}).subscribe(
			() => {
				this.viewDismiss();
				// loading.dismiss();
			},
			e => {
				// loading.dismiss();
				console.log(e);
			}
		);
	}
}
