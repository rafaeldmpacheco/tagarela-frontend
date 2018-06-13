import {Component, OnInit} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

@Component({
	selector: 'current-board',
	templateUrl: 'current-board.html'
})
export class CurrentBoardPage implements OnInit {

	public board: any;
	public selectedImages: any[] = [];

	constructor(private navCtrl: NavController,
				private navParams: NavParams) {
	}

	ngOnInit(): void {
		this.board = this.navParams.get('boardImages');
	}

	selectedImage(index) {
		this.selectedImages.push(this.board.images[index]);
	}
}
