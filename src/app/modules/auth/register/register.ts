import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoadingService } from '../../../shared/providers/loading.service';
import { LoginService } from '../../../shared/providers/login.service';
import { GridMenuComponent } from '../../../shared/components/grid-menu/grid-menu.component';
import { MessageService } from '../../../shared/providers/message.service';

@Component({
  selector: 'register',
  templateUrl: './register.html'
})
export class RegisterPage {
  public email: string;
  public password: string;
  public roles: string[] = [];
  public exceptionMessage: string;

  constructor(
    private navController: NavController,
    private loadingService: LoadingService,
    private loginService: LoginService,
    private messageService: MessageService
  ) {}

  public register() {
    if (!this.email || !this.password || !this.roles.length) {
      this.messageService.showMessageRequiredFields();
      return;
    }

    let loading: any = this.loadingService.createLoadingPage('Aguarde...');
    loading.present();

    const user = {
      email: this.email,
      password: this.password,
      roles: this.roles
    };

    this.loginService.newUser(user).subscribe(
      response => {
        this.loginService.setUser(response.user);
        this.navController.push(GridMenuComponent);
        loading.dismiss();
      },
      err => {
        this.exceptionMessage = err.error;
        loading.dismiss();
      }
    );
  }

  backToLogin() {
    this.navController.pop();
  }
}
