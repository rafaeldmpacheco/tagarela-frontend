import {Component, OnInit} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Camera, CameraOptions} from '@ionic-native/camera';
import {BoardService} from "../../providers/board.service";
import {LoadingService} from "../../providers/loading.service";

@Component({
	selector: 'manage-board',
	templateUrl: 'manage-board.html'
})
export class ManageBoardPage implements OnInit {

	public board: any = {name: '', images: []};

	constructor(private navCtrl: NavController,
				private boardService: BoardService,
				private camera: Camera,
				private loadingService: LoadingService,
				private navParams: NavParams) {
		this.board.images.push(this.mockImage);
		this.board.images.push(this.mockImage);
		this.board.images.push(this.mockImage);
		this.board.images.push(this.mockImage);
		this.board.images.push(this.mockImage);
		this.board.images.push(this.mockImage);
		this.board.images.push(this.mockImage);
		this.board.images.push(this.mockImage);
		this.board.images.push(null);
	}

	ngOnInit(): void {
		if (this.navParams.get('boardImages')) {
			// this.board = this.navParams.get('boardImages');
		}
	}

	newImage(index): void {
		let loading: any = this.loadingService.createLoadingPage("Aguarde...");
		loading.present();

		const options: CameraOptions = {
			destinationType: this.camera.DestinationType.DATA_URL,
			sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
			allowEdit: true,
			saveToPhotoAlbum: true,
			targetWidth: 2210,
			targetHeight: 2210,
			quality: 100,
		};
		this.camera.getPicture(options).then((imageData) => {
			this.board.images[index] = 'data:image/jpeg;base64,' + imageData;
			loading.dismiss();
		}).catch((error) => {
			console.log(error);
			loading.dismiss();
		});
	}

	saveBoard(): void {
		let loading: any = this.loadingService.createLoadingPage("Aguarde...");
		loading.present();

		this.boardService.saveBoardImages(this.board).subscribe(() => {
			this.boardService.haveNewBoard.next();
			this.navCtrl.pop();
			loading.dismiss();
		}, (err) => {
			console.log(err);
			loading.dismiss();
		});
	}

	updateBoard(): void {
		let loading: any = this.loadingService.createLoadingPage("Aguarde...");
		loading.present();

		this.boardService.updateBoardImages(this.board).subscribe(() => {
			this.boardService.haveNewBoard.next();
			this.navCtrl.pop();
			loading.dismiss();
		}, (err) => {
			console.log(err);
			loading.dismiss();
		});
	}

	deleteBoard(): void {
		let loading: any = this.loadingService.createLoadingPage("Aguarde...");
		loading.present();

		this.boardService.deleteBoardImages(this.board._id).subscribe(() => {
			this.boardService.haveNewBoard.next();
			this.navCtrl.pop();
			loading.dismiss();
		}, (err) => {
			console.log(err);
			loading.dismiss();
		});
	}

	private mockImage = 'https://static1.squarespace.com/static/55fc0004e4b069a519961e2d/t/55fc301ae4b01342ae9212a1/1442590746805/';

}
