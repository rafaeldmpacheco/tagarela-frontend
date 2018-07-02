import {Injectable} from '@angular/core';
import {LoadingController, Loading} from 'ionic-angular';

@Injectable()
export class LoadingService {
	constructor(public loadingCtrl: LoadingController) {
	}

	public createLoadingPage(message: string): Loading {
		return this.loadingCtrl.create({
			content: message,
			spinner: 'crescent',
		});
	}

	public createLoadingNavigate(message: string): Loading {
		return this.loadingCtrl.create({
			content: message,
			spinner: 'crescent',
			dismissOnPageChange: true
		});
	}
}
