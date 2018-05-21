import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {LoginPage} from "../login/login";
import {RegisterPage} from "../register/register";

@Component({
	selector: 'welcome',
	templateUrl: 'welcome.html'
})
export class WelcomePage {

	constructor(private navController: NavController) {
	}

	public login(): void {
		this.navController.push(LoginPage)
	}

	public register(): void {
		this.navController.push(RegisterPage)
	}
}
