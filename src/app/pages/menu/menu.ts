import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BoardPage } from '../board/board';
import { ProfilePage } from '../profile/profile';

@Component({
	templateUrl: 'menu.html'
})
export class MenuPage {
	allMenuItems: any;

	constructor(private navController: NavController) {
		this.allMenuItems = [
			{
				title: 'Pranchas',
				action: () => this.navController.push(BoardPage),
				icon: 'clipboard',
				roles: ['TEACHER', 'STUDENT'],
				hidden: false,
				name: 'board'
			},
			{
				title: 'Perfil',
				action: () => this.navController.push(ProfilePage),
				icon: 'contact',
				roles: ['TEACHER', 'STUDENT'],
				hidden: false,
				name: 'profile'
			}
		];
	}
}
