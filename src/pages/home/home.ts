import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {ManageBoardPage} from "../manage-board/manage-board";

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {

	constructor(public navCtrl: NavController) {
	}

	cadastrarPrancha() {
		this.navCtrl.push(ManageBoardPage)
	}
}
