import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { LoginService } from '../../providers/login.service';
import { ModulesService } from '../../providers/modules.service';
import { MenuPage } from '../menu/menu';
import { ModuleRegisterModal } from './modules-register-modal/modules-register-modal';

@Component({
	selector: 'page-modules',
	templateUrl: 'modules.html'
})
export class ModulesPage implements OnInit {
	public modules: any;
	public user: any;
	public isAdmin: boolean;

	constructor(
		public navCtrl: NavController,
		public modalCtrl: ModalController,
		private modulesService: ModulesService,
		private loginService: LoginService
	) {}

	ngOnInit(): void {
		this.user = this.loginService.getUser();
		this.isAdmin = this.user.roles.some(role => role === 'ADMIN');

		this.modules = JSON.parse(localStorage.getItem('modules'));
		if (!this.modules) {
			this.modulesService.getModules().subscribe(modules => {
				this.modules = modules;
			});
		}
	}

	goToMenu() {
		localStorage.setItem('modules', JSON.stringify(this.modules));
		this.navCtrl.push(MenuPage);
	}

	registerModule(module?: any) {
		let moduleRegisterModal = this.modalCtrl.create(ModuleRegisterModal);
		if (module) {
			moduleRegisterModal = this.modalCtrl.create(ModuleRegisterModal, { module });
		}
		moduleRegisterModal.present();
	}

	updateUserModule(module?: any) {
		let moduleRegisterModal = this.modalCtrl.create(ModuleRegisterModal);
		if (module) {
			moduleRegisterModal = this.modalCtrl.create(ModuleRegisterModal, { module });
		}
		moduleRegisterModal.present();
	}
}
