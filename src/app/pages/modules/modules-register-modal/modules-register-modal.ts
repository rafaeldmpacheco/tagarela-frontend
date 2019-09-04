import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { ModulesService } from '../../../providers/modules.service';

@Component({
	selector: 'modal-profile',
	templateUrl: 'modules-register-modal.html'
})
export class ModuleRegisterModal {
	public module: any;

	constructor(
		private navParams: NavParams,
		private viewCtrl: ViewController,
		private modulesService: ModulesService
	) {
		const params = this.navParams.get('module');
		this.module = params ? params : {};
	}

	viewDismiss() {
		this.viewCtrl.dismiss();
	}

	registerModule() {
		// let loading: any = this.loadingService.createLoadingPage('Aguarde...');
		// loading.present();
		let observable = this.modulesService.newModule(this.module);
		if (this.module.id) {
			observable = this.modulesService.updateModule(this.module);
		}
		observable.subscribe(
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
