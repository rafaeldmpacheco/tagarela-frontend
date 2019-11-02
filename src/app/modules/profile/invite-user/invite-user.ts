import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { LoadingService } from '../../../shared/providers/loading.service';
import { LoginService } from '../../../shared/providers/login.service';

@Component({
  selector: 'invite-user',
  templateUrl: './invite-user.html'
})
export class InviteUserPage {
  public user: any;
  public linkedUser: string;

  constructor(
    private viewCtrl: ViewController,
    private loadingService: LoadingService,
    private loginService: LoginService
  ) {
    this.user = this.loginService.getUser();
  }

  updateUser() {
    let loading: any = this.loadingService.createLoadingPage('Aguarde...');
    loading.present();

    const body = {
      email: this.user.email,
      linkedUserEmail: this.linkedUser
    };

    this.loginService.linkUser(body).subscribe(
      () => {
        loading.dismiss();
        this.viewCtrl.dismiss();
      },
      () => {
        loading.dismiss();
      }
    );
  }
}
