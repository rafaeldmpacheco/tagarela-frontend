import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { ModulesService } from '../../providers/modules.service';
import { ModuleRegisterModal } from './modules-register-modal/modules-register-modal';

@Component({
	selector: 'page-modules',
	templateUrl: 'modules.html'
})
export class ModulesPage implements OnInit {
	public modules: any;

	constructor(
		public navCtrl: NavController,
		public modalCtrl: ModalController,
		private modulesService: ModulesService
	) {}

	ngOnInit(): void {
		this.modulesService.getModules().subscribe(modules => (this.modules = modules));
	}

	registerModule(module?: any) {
		let moduleRegisterModal = this.modalCtrl.create(ModuleRegisterModal);
		if (module) {
			moduleRegisterModal = this.modalCtrl.create(ModuleRegisterModal, { module });
		}
		moduleRegisterModal.present();
	}
}
