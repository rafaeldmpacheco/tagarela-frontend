import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {TabsPage} from "../tabs/tabs";
import {LoginService} from "../../providers/login.service";

@Component({
	selector: 'login',
	templateUrl: 'login.html'
})
export class LoginPage {

	public email: string;
	public password: string;
	public exceptionMessage: string;

	constructor(private navController: NavController,
				private loginService: LoginService) {
	}

	public login() {
		if (this.email && this.password) {
			this.loginService.authenticate(this.email, this.password).subscribe(response => {
				if (response && response.success) {
					this.navController.push(TabsPage);
				} else {
					this.exceptionMessage = 'Usuário ou senha incorretos';
				}
			}, () => {
				this.exceptionMessage = 'Não foi possível realizar o login';
			});
		}
	}
}
