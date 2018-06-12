import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

@Component({
	selector: 'current-board',
	templateUrl: 'current-board.html'
})
export class CurrentBoardPage {

	public boardImages: any[];
	public selectedImages: any[] = [];

	constructor(private navCtrl: NavController,
				private navParams: NavParams) {
		this.boardImages = this.navParams.get('boardImages');
	}

	selectedImage(index) {
		this.selectedImages.push(this.boardImages[index]);
	}
}
