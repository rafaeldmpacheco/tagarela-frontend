import {Component, OnInit, Renderer2} from '@angular/core';
import {NavParams} from 'ionic-angular';

@Component({
	selector: 'current-board',
	templateUrl: 'current-board.html'
})
export class CurrentBoardPage implements OnInit {

	public board: any;
	public selectedImages: any[] = [];

	constructor(private renderer: Renderer2,
				private navParams: NavParams) {
	}

	ngOnInit(): void {
		this.board = this.navParams.get('boardImages');
	}

	selectedImage(index) {
		const elemento = document.getElementById(`card-${index}`);
		let indexSelectedImages = this.selectedImages.findIndex(item => item.id === index);

		if (indexSelectedImages === -1) {
			this.renderer.removeClass(elemento, 'unselected');
			this.renderer.addClass(elemento, 'selected');
			this.selectedImages.push({
				url: this.board.images[index],
				id: index
			});
		} else {
			this.selectedImages.splice(indexSelectedImages, 1);
			this.renderer.removeClass(elemento, 'selected');
			this.renderer.addClass(elemento, 'unselected');
		}

	}
}
