import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginService } from '../../../shared/providers/login.service';
import { RegisterPage } from '../register/register';
import { LoadingService } from '../../../shared/providers/loading.service';
import { GridMenuComponent } from '../../../shared/components/grid-menu/grid-menu.component';

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
						this.navController.push(GridMenuComponent);
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
