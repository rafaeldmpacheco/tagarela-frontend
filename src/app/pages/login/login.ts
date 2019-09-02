import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoadingService } from '../../providers/loading.service';
import { LoginService } from '../../providers/login.service';
import { MenuPage } from '../menu/menu';
import { RegisterPage } from '../register/register';

@Component({
	selector: 'login',
	templateUrl: 'login.html'
})
export class LoginPage {
	public email: string;
	public password: string;
	public exceptionMessage: string;

	constructor(
		private navController: NavController,
		private loadingService: LoadingService,
		private loginService: LoginService
	) {}

	public register(): void {
		this.navController.push(RegisterPage);
	}

	public login() {
		let loading: any = this.loadingService.createLoadingPage('Aguarde...');
		loading.present();

		if (this.email && this.password) {
			this.loginService.authenticate(this.email, this.password).subscribe(
				response => {
					if (response) {
						this.navController.push(MenuPage);
						loading.dismiss();
					} else {
						this.exceptionMessage = 'Usuário ou senha incorretos';
						loading.dismiss();
					}
				},
				() => {
					this.exceptionMessage = 'Não foi possível realizar o login';
					loading.dismiss();
				}
			);
		}
	}
}
