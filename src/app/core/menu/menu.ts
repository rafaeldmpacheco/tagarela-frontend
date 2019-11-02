import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginService } from '../../shared/providers/login.service';
import { ModulesService } from '../../shared/providers/modules.service';
import { ModulesPage } from '../../modules/settings/modules/modules';
import { ProfilePage } from '../../modules/profile/profile';
import { PlanPage } from '../../modules/boards/plan/plan';

@Component({
	templateUrl: 'menu.html'
})
export class MenuPage {
	allMenuItems: any;

	constructor(
		private navController: NavController,
		private modulesService: ModulesService,
		private loginService: LoginService
	) {
		const moduleRegister = {
			title: 'Modulos',
			action: () => this.navController.push(ModulesPage),
			icon: 'cog',
			roles: ['ADMIN'],
			isVisible: true,
			name: 'modules'
		};

		this.allMenuItems = JSON.parse(localStorage.getItem('modules'));

		if (!this.allMenuItems) {
			this.modulesService.getModules().subscribe(modules => {
				this.allMenuItems = [...modules, moduleRegister];

				this.allMenuItems.forEach(element => {
					this.setActions(element);

					element.isVisible = true;
				});

				localStorage.setItem('modules', JSON.stringify(modules));
			});
		} else {
			this.allMenuItems = [...this.allMenuItems, moduleRegister];

			this.allMenuItems.forEach(element => {
				this.setActions(element);
			});
		}
	}

	private setActions(element) {
		if (element.name === 'plan') {
			element.action = () => this.navController.push(PlanPage);
		}
		if (element.name === 'profile') {
			element.action = () => this.navController.push(ProfilePage);
		}
	}
}
