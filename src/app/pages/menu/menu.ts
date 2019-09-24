import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BoardPage } from '../board/board';
import { ProfilePage } from '../profile/profile';
import { ModulesService } from '../../providers/modules.service';
import { ModulesPage } from '../modules/modules';
import { LoginService } from '../../providers/login.service';

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
			hidden: false,
			name: 'modules'
		};

		this.modulesService.getModules().subscribe(modules => {
			this.allMenuItems = [...modules, moduleRegister];

			this.allMenuItems.forEach(element => {
				if (element.name === 'board') {
					element.action = () => this.navController.push(BoardPage);
				}
				if (element.name === 'profile') {
					element.action = () => this.navController.push(ProfilePage);
				}

				element.hidden = false
			});
		});
	}
}
