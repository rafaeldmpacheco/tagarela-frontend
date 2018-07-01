import {Component, OnInit} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Camera, CameraOptions} from '@ionic-native/camera';
import {BoardService} from "../../providers/board.service";

@Component({
	selector: 'manage-board',
	templateUrl: 'manage-board.html'
})
export class ManageBoardPage implements OnInit {

	public board: any = {name: '', images: []};

	constructor(private navCtrl: NavController,
				private boardService: BoardService,
				private camera: Camera,
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
			this.board = this.navParams.get('boardImages');
		}
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
		this.boardService.saveBoardImages(this.board).subscribe(() => {
			this.boardService.haveNewBoard.next();
			this.navCtrl.pop();
		}, (err) => {
			console.log(err)
		});
	}

	deleteBoard(): void {
		this.boardService.deleteBoardImages(this.board._id).subscribe(() => {
			this.boardService.haveNewBoard.next();
			this.navCtrl.pop();
		}, (err) => {
			console.log(err)
		});
	}

	private mockImage = 'https://static1.squarespace.com/static/55fc0004e4b069a519961e2d/t/55fc301ae4b01342ae9212a1/1442590746805/';

}
