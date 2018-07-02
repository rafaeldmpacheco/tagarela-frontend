import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {TabsPage} from "../tabs/tabs";
import {LoginService} from "../../providers/login.service";
import {LoadingService} from "../../providers/loading.service";

@Component({
	selector: 'login',
	templateUrl: 'login.html'
})
export class LoginPage {

	public email: string;
	public password: string;
	public exceptionMessage: string;

	constructor(private navController: NavController,
				private loadingService: LoadingService,
				private loginService: LoginService) {
	}

	public login() {
		let loading: any = this.loadingService.createLoadingPage("Aguarde...");
		loading.present();

		if (this.email && this.password) {
			this.loginService.authenticate(this.email, this.password).subscribe(response => {
				if (response && response.success) {
					this.loginService.setUser(response.user);
					this.navController.push(TabsPage);
					loading.dismiss();
				} else {
					this.exceptionMessage = 'Usuário ou senha incorretos';
					loading.dismiss();
				}
			}, () => {
				this.exceptionMessage = 'Não foi possível realizar o login';
				loading.dismiss();
			});
		}
	}
}
