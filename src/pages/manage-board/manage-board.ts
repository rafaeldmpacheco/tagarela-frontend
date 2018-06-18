import {Component} from '@angular/core';
import {ActionSheetController, NavController} from 'ionic-angular';
import {Camera, CameraOptions} from '@ionic-native/camera';
import {BoardService} from "../../providers/board.service";

@Component({
	selector: 'manage-board',
	templateUrl: 'manage-board.html'
})
export class ManageBoardPage {

	public board: any = {name: '', images: []};

	constructor(private navCtrl: NavController,
				private actionSheetCtrl: ActionSheetController,
				private boardService: BoardService,
				private camera: Camera) {
		this.board.images.push(this.mockImage);
		this.board.images.push(null);
		this.board.images.push(this.mockImage);
		this.board.images.push(this.mockImage);
		this.board.images.push(this.mockImage);
		this.board.images.push(this.mockImage);
		this.board.images.push(this.mockImage);
		this.board.images.push(this.mockImage);
		this.board.images.push(this.mockImage);
	}

	newImage(index): void {
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
		}).catch((error) => {
			console.log(error);
		});
	}

	saveBoard(): void {
		this.boardService.saveBoardImages(this.board);
		this.navCtrl.pop();
	}

	private mockImage = 'https://www.google.com.br/logos/doodles/2018/dia-dos-namorados-2018-5894886078283776.3-l.png';

}
